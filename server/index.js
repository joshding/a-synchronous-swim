const swimTeam = require('../client/js/swimTeam');
const keypressHandler = require('./js/keypressHandler');
const messageQueue = require('./js/messageQueue');
// right now, keypress handler is allowing 'message received' upon success of a message. When we send an ajax request, we want it to go from the server to the
keypressHandler.initialize(message => {
  console.log(`Message received: ${message}`);

  messageQueue.enqueue(message);

});

const httpHandler = require('./js/httpHandler');


const http = require('http');
// creates a server with httpHandler.router as a callback.httpHandler.router console.logs the type of request and the url.
const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
//last parameter will be listener callback. (Port, host,backlog, callback)
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);