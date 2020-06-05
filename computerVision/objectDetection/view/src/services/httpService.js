const axios = require('axios')
const dev = require('./../dev')

const HttpHandler = {
  baseURL: 'https://withtheboys.se/',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 60000,
  totalTimeout: 300000,
  maxRetries: 5,
  retry: true
}

if (dev.dev) {
  HttpHandler.baseURL = 'http://localhost:8088/'
}

HttpHandler.get = (args) => new Promise((resolve, reject) => {
  if (typeof args === 'string') {
    let url = args
    args = { url }
  }
  args.method = 'get'
  HttpHandler.request(args)
    .then((data) => {
      resolve(data)
    })
    .catch(err => reject(err))
})

HttpHandler.post = (args) => new Promise((resolve, reject) => {
  if (typeof args === 'string') {
    let url = args
    args = { url }
  }
  args.method = 'post'
  args.data = args.body || args.data || ''

  HttpHandler.request(args)
    .then((data) => {
      resolve(data)
    })
    .catch(err => reject(err))
})

HttpHandler.request = (args) => new Promise((resolve, reject) => {
  let received = false

  const cbResolve = (data) => {
    received = true
    resolve(data)
  }
  const cbReject = (err) => {
    reject(err)
  }

  if (args.retry === undefined) args.retry = HttpHandler.retry

  args.nrOfAttempts = args.nrOfAttempts || 0
  args.maxRetries = args.maxRetries || HttpHandler.maxRetries
  args.baseURL = args.baseURL || HttpHandler.baseURL
  args.timeout = args.timeout || HttpHandler.timeout
  args.totalTimeout = args.totalTimeout || HttpHandler.totalTimeout
  args.url = args.url || HttpHandler.baseURL
  args.headers = args.headers || HttpHandler.headers
  args.data = args.data || ''
  args.formData = args.formData || ''

  tryRequesting(args, cbResolve, cbReject)

  setTimeout(() => {
    if (!received) {
      reject(new Error('Timeout when requesting data'))
    }
  }, args.totalTimeout)
})

const tryRequesting = (args, cbResolve, cbReject) => {
  args.nrOfAttempts++
  // Method defaults to get
  axios(args)
    .then((data) => {
      cbResolve(data)
    })
    .catch(err => {
      if (args.nrOfAttempts > args.maxRetries || !args.retry) {
        cbReject(err)
        return
      } else {
        global.bugsnagClient.notify(err)
      }
      setTimeout(() => {
        tryRequesting(args, cbResolve, cbReject)
      }, 200 * args.nrOfAttempts * args.nrOfAttempts)
    })
}

module.exports = HttpHandler
