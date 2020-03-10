const path = require('path')
const config = require('./config/config')
const log = require('./util/log')('routes')
const qs = require('qs')
const axios = require('axios')


module.exports = function (args) {
  const app = args.app
  const express = args.express
  const debugg = true;

  if (debugg) {
    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Token, Origin, X-Requested-With, Content-Type, Accept, Authorization')
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
      next()
    })
  }


  app.get('/yolov3', (req, res) => {
    const file = 'yolov3.weights'

    const path = `./data/${file}`;
    res.download(path); // Set disposition and send it.
  })


  app.get('/yolov3Tiny', (req, res) => {
    const file = 'yolov3-tiny.weights'

    const path = `./data/${file}`;
    res.download(path); // Set disposition and send it.
  })


  app.get('/aiBig', (req, res) => {
    const file = 'aiTrainingSantaMonica.mp4'

    const path = `./data/${file}`;
    res.download(path); // Set disposition and send it.
  })


  app.get('/aiSmall', (req, res) => {
    const file = 'santaMonicaShort2.mp4'

    const path = `./data/${file}`;
    res.download(path); // Set disposition and send it.
  })

  app.get('/downloadDarknetYao', (req, res) => {
    const file = `./data/darknet.zip`;
    res.download(file); // Set disposition and send it.
  })

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}