/**
 * Primary file for the API
 * 
 * 
 */

// Internal Dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');
const { StringDecoder } = require('string_decoder');
// External Dependencies
const Logger = require('./lib/logger')
const router = require('./lib/router')
const { parseURL } = require('./lib/parser')
const config = require('./config')
const PORT = 3000;

// Instantiate the HTTP server
var httpServer = http.createServer(function(req, res) {
  unifiedServer(req, res);
});

// Start the server, and have it listen on port 3000
httpServer.listen(config.httpPort, function() {
  console.log(`The server is listeneing on port ${config.httpPort} in ${config.envName} now.\n`)
});

// Instantiate the HTTP server
const httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cer': fs.readFileSync('./https/cert.pem')
};
const  httpsServer = https.createServer(httpsServerOptions, function(req, res) {
  unifiedServer(req, res);
});

// Start the server, and have it listen on port 3000
httpsServer.listen(config.httpsPort, function() {
  console.log(`The server is listeneing on port ${config.httpsPort} in ${config.envName} now.\n`)
});

// All the server logic for both the http and https sever
const unifiedServer = function(req, res) {
   // Get the URL and parse it
   const { queryStringObject, trimmedPath, method, headers } = parseURL(req)

   // Get the payload if any
   const decoder = new StringDecoder('utf-8');
   let buffer = '';
   req.on('data', function(data) {
     buffer = decoder.write(data);
   });
 
   req.on('end', () => {
     buffer += decoder.end();
     let data = { trimmedPath, queryStringObject, method, headers, buffer }
 
     // Log request data
     Logger.logRequestData(data)
 
     // Chose the handler this reqesut should go to. If one is not
     console.log(trimmedPath)
     console.log(typeof(router[trimmedPath]) !== 'undefined')
     let requestHandlerString = typeof(router[trimmedPath]) !== 'undefined' ? 
       trimmedPath : 
       'notFound'
     let requestHandler = router[requestHandlerString]
 
     // Route the request to the handler specified in the router
     requestHandler(data, (statusCode, data) => {
       const payload = typeof data === 'object' ? data : {};
      
       // Convert the payload to a string
       let payloadString = JSON.stringify(payload);
       
       // Log response data on the server console
 
       // Return the response
       res.setHeader('Content-Type', 'application/json')
       res.writeHead(statusCode);
       Logger.logResponsetData(statusCode, trimmedPath, requestHandlerString, payload, res.headers);
       res.end(payloadString);
     });
   });
};
