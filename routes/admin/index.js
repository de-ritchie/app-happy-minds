const path = require('path');
const fs = require('fs');

const es = require('event-stream');
const express = require('express');
const multer = require('multer');

const multerUtil = require('../../util/multer');
const Word = require('../../model/Word');
const Dictionary = require('../../model/Dictionary');

const router = express.Router();
const maxSize = 200 * 1000 * 1000;

router.route('/')
.post(multer({
    dest: path.join(__dirname, '..', '..', 'uploads'),
    limits: { fileSize: maxSize }
}).array("upload", 1), (req, res) => {
    
    console.log(req.files, req.body);
    let file = req.files[0];
    
    if(file && file.mimetype == 'text/plain'){

        let words = [];
        let totalLines = 0;
        let start = 0;
        let word = null;
        
        fs.createReadStream(path.join(__dirname, '..', '..', 'uploads', file.filename))
        .pipe(es.split())
        .pipe(
            es
            .mapSync((line) => {

                if(line !== "---------------------------"){
                    if(start == 0){
                        word = new Word(line);
                        start += 1;
                    } else{
                        word.addDefinition(line);
                    }
                } else{
                    start = 0;
                    if(word){
                        words.push(word);
                    }
                }
                totalLines ++;
                // console.log("===>",line);
            })
            .on('error', (err) => {
                console.log(err);
            })
            .on('end', () => {
                // console.log(words);
                let dict = new Dictionary();
                dict.connect()
                .then(con => {
                    dict.insertWords(con, words)
                    .then((resp) => {
                        console.log('rssss', resp);
                    })
                    .catch(err => {
                        console.log("====> Error in inserting...", err);
                    });
                })
                .catch((err) => {
                    console.log('Connection error mongoDB', err);
                })
                multerUtil.cleanUp(file);
            })
        )

        res.status(200)
        .json({
            message: "Uploaded Successfully !!!"
        });
    } else{
        res.status(200)
        .json({
            message: "invalid format"
        });
        multerUtil.cleanUp(file);
    }
});

module.exports = router;