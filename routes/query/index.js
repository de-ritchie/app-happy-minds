const express = require('express');

let Dictionary = new require('../../model/Dictionary');

const router = express.Router();
let dictionary = new Dictionary();
let conRef = dictionary.connect()

router.route('/')
.get((req, res) => {
    conRef
    .then((con) => {
        dictionary.query(con, req.query.term)
        .then((resp) => {
            console.log("Ressss", resp)
        })
        .catch((err) => {
            console.log("adsadsa", err);
        })
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;