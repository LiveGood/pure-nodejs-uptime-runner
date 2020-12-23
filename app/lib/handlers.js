// Define the handlers
const handlers = {};

handlers.users = function({ method }, callback) {
  if (!hasAllowedMethod(method, handlers.users.allowedMethods)) return callback(405);

};

handlers.users.allowedMethods = ['post', 'get', 'put', 'delete'];
handlers._users = {
  get(data, callback) {},
  put(data, callback) {},
  delete(data, callback) {}
};

// FIXME: make methods for request parameter checkings
  // Required data: firstName, lastName, phone, password, tosAgreement
handlers._users.post = (data, callback) => {
  let firstName, lastName, phone, password, tosAgreement;
  [firstName, lastName] = checkParams([data.firstName, data.lastName], {
    type: 'string', 
    trim: true
  });
};

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

function hasAllowedMethod(requestMethod, acceptableMethods) {
  return acceptableMethods.includes(requestMethod)
}

function paramCheck(param, { type, trim }) {
  return type && typeof(param) == 'type'
}

function checkParams(paramsArray, options) {

}


module.exports = handlers;
