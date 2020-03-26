/**
 * Importing config
 */
let config = require('./config/config')
let dev = require('./dev')

/**
 * Declaring external dependencies
 */
const express = require('express')
const app = express()
if (dev.bugsnag) {
  const bugsnag = require('@bugsnag/js')
  const bugsnagExpress = require('@bugsnag/plugin-express')
  const bugsnagClient = bugsnag('7f3bfcc6ba2eb905c116f1f35ac679b3')
  bugsnagClient.use(bugsnagExpress)
  const middleware = bugsnagClient.getPlugin('express')
  // This must be the first piece of middleware in the stack.
  // It can only capture errors in downstream middleware
  app.use(middleware.requestHandler)
  bugsnagClient.use(bugsnagExpress)
  global.bugsnagClient = bugsnagClient
}
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const util = require('./util/util')()
const fs = require('fs')
const server = require('http').Server(app)
const log = require('./util/log')('App')

if (dev.verbose) {
  var morgan = require('morgan')
  app.use(morgan('dev'))
}

if (dev.localDatabase) {
  config.database.connection.host = 'localhost'
}

/**
 * Declaring Internal dependencies
 */


/*
 * Initates the database with standard records (starpages, usertypes, users and transactions)
 */
if (dev.initiate) {
  let database = 'database'
  require(`./config/${database}/insert`)(dev.dev)
}

/**
 * Reads clients cookies (needed for auth and to keep the logged in)
 */
app.use(cookieParser())
/**
 * Limits the urlencoded file size that can be transfered to the server
 */
app.use(bodyParser.urlencoded({
  parameterLimit: 13421772800,
  limit: '134217728', // 128mb
  type: 'application/x-www-form-urlencoded',
  extended: true
}))
/**
 * Limits the JSON string size that will be accepted to the server.
 */
app.use(bodyParser.json({
  limit: '134217728', // 128mb
  parameterLimit: 100000,
  type: '*/*',
  extended: true,
  'Access-Control-Allow-Origin': '*'
}))

/**
 * Used to transport information between client states (not logged -> logged in AND not logged -> not logged)
 */
app.use(flash())

require('./routes.js')({
  app,
  express
})


/**
 * Starts server on port/host from config
 */

server.listen(config.server.port, config.server.host)
//httpsServer.listen(config.server.port, config.server.host);
log.success(`${util.getTimeStamp()}: Server started on ${config.server.host}:${config.server.port}`)

// If we have a unhandled rejection, print it
process.on('unhandledRejection', (error, p) => {
  log.warning('Unhandled Rejection at: Promise', p, 'error stack:', error.stack)
})
