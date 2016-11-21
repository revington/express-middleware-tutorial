'use strict';

const express = require('express'),
    app = express();

function plusOne(req, res, next){
    req.counter = req.counter || 0;
    req.counter++;
    return next();
}

function respond(req, res){
    res.end('Hello from express req.counter value = ' + req.counter);
}

app.use('/', plusOne, plusOne, respond);

app.listen(3000);
