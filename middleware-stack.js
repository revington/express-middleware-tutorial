'use strict';

const http = require('http');

function plusOne(req, res, next){
    // Set req.counter to 0 if and only if req.counter is not defined
    req.counter = req.counter || 0;
    req.counter++;
    return next();
}

function respond(req, res){
    res.end('req.counter value = ' + req.counter);
}

function createMiddlewareStack(/*a bunch of middlewares*/){
    var stack = arguments;

    return function middlewareStack(req, res){
        let i = 0;

        function next(){
            // pick the next middleware function from the stack and
            // increase the pointer
            let currentMiddleware = stack[i];
            i = i + 1;
            currentMiddleware(req, res, next);
        }
        // Call next for the first time
        next();
    }
}

var myMiddlewareStack = createMiddlewareStack(plusOne, plusOne, respond);

function httpHandler(req, res){
    myMiddlewareStack(req, res);
}

http.createServer(httpHandler).listen(3000);
