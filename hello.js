var http = require('http');

function handler(request, response){
	response.end('hello world');
}

http.createServer(handler).listen(3000);
