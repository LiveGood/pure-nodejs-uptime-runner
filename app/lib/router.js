// Define the handlers
const handlers = {};

// Ping handler
handlers.ping = function(data, callback) {
  callback(200);
};

// sample handler
handlers.sample = function(data, callback) {
  // Callback a http status
  callback(406, {'name': 'sample handler'});
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

module.exports = {
  'sample': handlers.sample,
  'notFound': handlers.notFound,
  'ping': handlers.ping
}
