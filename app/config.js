/**
 * Create and export configuration varibales
 * 
 */

 // Cotnainter for all the environments
 const enviornments = {};

 // Staging (default) enviornment
 enviornments.staging = {
  port: 3000,
  envName: 'staging'
 };

 // Production enviornment
 enviornments.production = {
  port: 5000,
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
