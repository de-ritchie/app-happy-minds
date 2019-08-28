const express = require('express');

const Dictionary = require('../../model/Dictionary');

const router = express.Router();

router.route('/')
.get((req, res) => {
    let dict = new Dictionary();
    dict.connect()
    .then((con) => {
        dict.search(con, req.query.term)
        .then(resp => {
            res.status(200)
            .json(resp);
        })
        .catch(err => {
            console.log("Error occurredin searching", err);
            res.status(500)
            .json({
                message: "ISE"
            })
        })
    })
    .catch((err) => {
        console.log("Error occurredin connecting", err);
        res.status(500)
        .json({
            message: "ISE"
        })
    });
    // conRef
    // .then((con) => {
    //     dictionary.query(con, req.query.term)
    //     .then((resp) => {
    //         console.log("Ressss", resp)
    //     })
    //     .catch((err) => {
    //         console.log("adsadsa", err);
    //     })
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
});

module.exports = router;