/**
 * Library for stoing and editing data
 * 
 */

 // Dependencies
 const fs = require('fs');
 const path = require('path');
const { callbackify } = require('util');

 // Container for the module (to be exported)
let lib = {};

// Base directory of the datat folder
lib.baseDir = path.join(__dirname, '../.data/');

// Wriate data to a file
lib.create = function(dir, file, data, callback) {
  // Open the file for writing
  let filePath = `${lib.baseDir}${dir}/${file}.json`;

  fs.open(filePath, 'wx', (err, fileDiscriptor) => {
    if (err) return callback(err.message)
    // Convert data to string
    let stringData = JSON.stringify(data);

    // Write to file and close it
    fs.writeFile(fileDiscriptor, stringData, (err) => {
      if (err) return callback('Error writing to new file');
      fs.close(fileDiscriptor, (err) => {
        if (err) return callback('Error closing the file')
        callback(false);
      });
    });
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir}${dir}/${file}.json`, 'utf8', (err, data) => {
    callback(err, data);
  });
};

lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', (err, fileDiscriptor) => {
    if (err) return callback('Error: Could not open a file');

    // Convert data to string
    let stringData = JSON.stringify(data);

    // NEXT: Truncate the contents of the file
    fs.ftruncate(fileDiscriptor, function(err) {
      if (err) return callback('Error: trunctating a site');

      fs.writeFile(fileDiscriptor, stringData, (err) => {
        if (err) return callback('Error writing to an exisiting file');

        fs.close(fileDiscriptor, (err) => {
          if (err) return callback('Error: closing the file');
          
          callback(false);
        });
      });
    });
  });
};

lib.delete = (dir, file, callback) => {
  // Unlink the file
  fs.unlink(`${lib.baseDir}${dir}/${file}.json`, (err) => {
    if (err) return callback('Error delete file');

    callback(false);
  });
};

 // Export the module
 module.exports = lib;
