const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/ping', (req, res) => {
    res.json({
        message: 'pong'
    })
});

app.use('/query', require('./routes/query'));
app.use('/login', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

http.createServer(app)
.listen(config.PORT, () => {
    console.log("Server started at", config.PORT);
});