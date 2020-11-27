
const router = require('./router')

function getNotFoundString(requestHandlerString) {
  return requestHandlerString == 'notFound' ? 
    '-> Not Found' :
    router[requestHandlerString] ? 
    '-> Path exists' :
    ''
}

function logRequestData({ trimmedPath, queryStringObject, method, headers, buffer }) {
  console.log('-------Request Data-------')
  console.log(`Path: ${trimmedPath}`);
  console.log('Method:', method)
  console.log('Query string:', queryStringObject)
  console.log('Headers:\n', headers);
  console.log('Payload:', buffer);

  console.log()
}

function logResponsetData(statusCode, trimmedPath, requestHandlerString, payload, headers) {
  console.log('-------Response Data-------')
  console.log(`Handling: ${trimmedPath} ${getNotFoundString(requestHandlerString)}`);
  console.log('Status code:', statusCode);
  console.log('Headers:\n', headers);
  console.log('Payload:', payload);

  console.log()
}

module.exports = { logRequestData, logResponsetData }
