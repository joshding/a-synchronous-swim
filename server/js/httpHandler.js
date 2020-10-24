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
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  //console.log('response object: ', res);
  if(req.method === 'GET' && req.url.slice(0,15) === '/background.jpg') {
    // figure out how to read files from client. fs.readFile
    fs.readFile(module.exports.backgroundImageFile , (err, image) => {
      if(err) {
        res.writeHead(404, headers);
      } else {
        res.writeHead(200, headers);
        res.write(image);
      }
      res.end();
      next();
    });
  } else if (req.method === 'GET') {

    data = queue.dequeue();
    res.writeHead(200, headers);
    res.end
    ();
    next();

  }

  if(req.method === 'POST') {
    var backGround = Buffer.alloc(0);

    req.on('data', (postData) => {
      backGround = Buffer.concat([backGround, postData]);
    });
    req.on('end', () => {
      var image = multipart.getFile(backGround);
      fs.writeFile(module.exports.backgroundImageFile, image.data, (err) => {
          if (err) {
          console.log(err);
          throw err;
        }
        res.end()
        next();
      });
    });
  }

};