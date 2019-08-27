const express = require('express');

const config = require('../../config');

const router = express.Router();

router.route('/')
.post((req, res) => {
    console.log("req", req.body);
    if(req.body.username && req.body.password){
        res.status(200)
        .json({
            token: config.TOKEN
        });
    } else{
        res.status(403)
        .send("Unauthorized");
    }
});

module.exports = router;