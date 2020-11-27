/**
 * Primary file for the API
 * 
 * 
 */
// Internal Dependencies
const http = require('http');
const { StringDecoder } = require('string_decoder');
// External Dependencies
const Logger = require('./lib/logger')
const router = require('./lib/router')
const { parseURL } = require('./lib/parser')
const config = require('./config')
const PORT = 3000;

// The server should respond to all requests with a string
var server = http.createServer(function(req, res) {

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
});

// Start the server, and have it listen on port 3000
server.listen(config.port, function() {
  console.log(`The server is listeneing on port ${config.port} in ${config.envName} now.\n`)
});
