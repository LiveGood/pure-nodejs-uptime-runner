/**
 * Create and export configuration varibales
 * 
 */

 // Cotnainter for all the environments
 const enviornments = {};

 // Staging (default) enviornment
 enviornments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging'
 };

 // Production enviornment
 enviornments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production'
};

let currentEnviornment = typeof(process.env.NODE_ENV) == 'string' ?
  process.env.NODE_ENV.toLowerCase() :
  '';

// Check that the current enviornment is one of the enviornments above, if not default to stagin
const envToExport = enviornments.hasOwnProperty(currentEnviornment) ? 
  enviornments[currentEnviornment] :
  enviornments.staging

module.exports = envToExport;
