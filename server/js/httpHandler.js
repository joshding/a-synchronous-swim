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
  res.writeHead(200, headers);
const swimCommands=['up','down', 'left', 'right']
var data;

//console.log('response object: ', res);
console.log(module.exports.backgroundImageFile);
if(req.method === 'GET' && req.url.slice(0,15) === '/background.jpg') {
  console.log('we are in router');

  // figure out how to read files from client. fs.readFile
  fs.readFile(module.exports.backgroundImageFile , (err, image) => {
    console.log('image in readFile: ', image)
    if(err) {
      console.log('error: ', err);
    } else {
        res.write(module.exports.backgroundImageFile, (err, data) => {
        console.log('data written successfully');
        res.end();
        next();
    });
  }
  //res.end(image);
});
/*
put a "data" listeneron request

*/
// req.on('data', (postData) => {
//   const backGround = multipart.getFile(postData);

//   fs.writeFile(backGround.filename, backGround.data, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!', res);
//   });

// });
// fs.writeFile(module.exports.backgroundImageFile , (err, image) => {
// console.log('image: ', image);
//  // res.end(image);
//  });


}else if(req.method === 'GET') {
  data = queue.dequeue();
}

/*
if the request method is 'POST'
  use request.on('data', callback is (postData) => console.log(postData.toString()))
*/
if(req.method === 'POST') {
  console.log('postdata: ',req.postData)
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
      // console.log('image: ',);
      res.end()
      next();
    });
  });
}


    //   console.log('The file has been saved!', res);
    //   res.write(backGround.data);
    //   res.end();
    // });


// console.log('file data: ', data)
//   res.end(data);
//   next(); // invoke next() at the end of a request to help with testing!
};