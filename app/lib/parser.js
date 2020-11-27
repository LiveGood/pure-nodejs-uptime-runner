const url = require('url');

module.exports = {
  parseURL(request) {
    let parsedUrl = url.parse(request.url, true);
  
    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')
  
    // Get the method
    const method = request.method.toLowerCase();
  
    // Get the query string as an object
    const queryStringObject = parsedUrl.query;  
    // res.write(JSON.stringify(parsedUrl, null, 2) + '\n');
  
    // Get the headers as an object
    const headers = request.headers;  
  
    return { parsedUrl, path, trimmedPath, method, queryStringObject , headers }
  }
}
