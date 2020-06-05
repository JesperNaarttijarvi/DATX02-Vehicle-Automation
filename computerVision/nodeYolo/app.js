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
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const util = require('./util/util')()
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
 * Reads clients cookies (needed for auth and to keep the logged in)
 */
app.use(cookieParser())
/**
 * Limits the urlencoded file size that can be transfered to the server
 */
app.use(bodyParser.urlencoded({
  parameterLimit: 13421772800,
  limit: '1024000000', // 1024mb
  type: 'application/x-www-form-urlencoded',
  extended: true
}))
/**
 * Limits the JSON string size that will be accepted to the server.
 */
app.use(bodyParser.json({
  limit: '1024000000', // 1024mb
  parameterLimit: 13421772800,
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
log.success(`${util.getTimeStamp()}: Server started on ${config.server.host} ${config.server.port}`)

// If we have a unhandled rejection, print it
process.on('unhandledRejection', (error, p) => {
  log.warning('Unhandled Rejection at: Promise', p, 'error stack:', error.stack)
})

