const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const queue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

// request and response results from the mock server are inputs. This is what adds properties to the response object.
module.exports.router = (req, res, next = () => {}) => {
  //console.log('Serving request type ' + req.method + ' for url ' + req.url);
// if req.method is get, res.write('up')

  res.writeHead(200, headers);
const swimCommands=['up','down', 'left', 'right']
var data;
if(req.method === 'GET') {
data =queue.dequeue();
}
console.log('response object: ', res);
if(req.method === 'POST'){
  console.log(req.data);
}
  res.end(data);
// getFile(res._data)
  next(); // invoke next() at the end of a request to help with testing!
};