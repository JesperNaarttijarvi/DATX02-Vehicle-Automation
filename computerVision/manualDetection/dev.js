/*
 Contains all the dev parameters for the server. Dont alter this file unless you know the consequences
*/

let dev
let localDev = true

if (localDev) {
  dev = {
    dev: true, // production: false
    localServer: false, // production: false
    localDatabase: false, // production: false
    bugsnag: false,
    devServer: false, // production: false
    devDatabase: false, // production: false
    testDatabase: false, // production: false
    verbose: false, // production: false
    mail: true, // production: true
    clearance: false, // production: true
    cors: true, // production: false
    initiate: false // production: false
  }
} else {
  dev = {
    dev: false, // production: false
    localServer: false, // production: false
    localDatabase: false, // production: false
    bugsnag: true,
    devServer: false, // production: false
    devDatabase: false, // production: false
    testDatabase: false, // production: false
    verbose: false, // production: false
    mail: true, // production: true
    clearance: true, // production: true
    cors: true, // production: false
    initiate: false // production: false
  }
}

module.exports = dev
