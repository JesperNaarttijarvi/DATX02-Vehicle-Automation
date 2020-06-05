let util = null

module.exports = (importingServiceName) => {
  const log = {
    serviceName: importingServiceName,
    allowLogToConsole: true,
    allowLogToFile: true,
    directory: './logs/',
    types: {
      // For development
      debug: true,
      warning: true,
      info: true,
      todo: true,
      fixme: true,
      success: true
    },
    history: {
      error: [],
      debug: [],
      warning: [],
      info: [],
      todo: [],
      fixme: [],
      success: []
    },
    count: {
      error: 0,
      debug: 0,
      warning: 0,
      info: 0,
      todo: 0,
      fixme: 0,
      success: 0
    },
    loginTime: new Date(),
    onCloseData: null
  }

  log.debug = (message, data) => {
    const type = 'debug'

    // Log to console
    log.logToConsole(type, message, data)

    // Store to history
    log.storeToHistory(type, message)
  }
  log.warning = (message, data) => {
    const type = 'warning'

    // Log to console
    log.logToConsole(type, message, data)

    // Store to history
    log.storeToHistory(type, message)
  }
  log.info = (message, data) => {
    const type = 'info'

    // Log to console
    log.logToConsole(type, message, data)

    // Store to history
    log.storeToHistory(type, message)
  }
  log.todo = (message, data) => {
    const type = 'todo'

    // Log to console
    log.logToConsole(type, message, data)

    // Store to history
    log.storeToHistory(type, message)
  }
  log.fixme = (message, data) => {
    const type = 'fixme'

    // Log to console
    log.logToConsole(type, message, data)

    // Store to history
    log.storeToHistory(type, message)
  }
  log.success = (message, data) => {
    const type = 'success'

    // Log to console
    log.logToConsole(type, message, data)

    // Store to history
    log.storeToHistory(type, message)
  }

  // Custom logs
  log.error = (message) => {
    const type = 'ERROR'

    // eslint-disable-next-line
    console.log(`${log.serviceName} [${type.toUpperCase()}]: (${log.count['error']})`, message);

    // Log sequences
    log.latest()

    log.storeToHistory('error', message)
    if (log.allowLogToFile) log.logToFile(type, message, null)
  }

  // Functionality
  log.logToConsole = (prefix, message, data) => {
    if (!log.types[prefix]) return
    if (log.allowLogToFile) log.logToFile(prefix, message, data)
    if (!log.allowLogToConsole) return

    // eslint-disable-next-line
    console.log(`${log.serviceName} [${prefix.toUpperCase()}] (${log.count[prefix]}): ${message}`);

    if (data) {
      // eslint-disable-next-line
      console.log(data);
    }
  }

  // Return the time in seconds since login
  log.getTime = () => (new Date() - log.loginTime) / 1000

  log.storeToHistory = (type, message) => {
    switch (type) {
      case 'error':
        // global.bugsnagClient.notify(message)
        break
      case 'info':
        // global.bugsnagClient.notify(message, {severity: type})
        break
      case 'warning':
        // global.bugsnagClient.notify(message, {severity: type})
        break
      default:
        break
    }
    // See if the previous history is the same as log message
    const LAST_ITEM_INDEX = log.history[type].length - 1

    if (LAST_ITEM_INDEX >= 0) {
      const PREVIOUS_MESSAGE = log.history[type][LAST_ITEM_INDEX]
      const TRIM_INDEX = PREVIOUS_MESSAGE.indexOf(':') + 2
      const PREVIOUS_MESSAGE_TRIMMED = PREVIOUS_MESSAGE
        .substring(TRIM_INDEX, PREVIOUS_MESSAGE.length)

      // Adjust message to display multiple similar messages
      if (PREVIOUS_MESSAGE_TRIMMED === message) {
        // Count number of similar messages
        const END_COUNT_INDEX = PREVIOUS_MESSAGE.indexOf(')')
        const COUNT = (END_COUNT_INDEX === -1)
          ? 2
          : Number(PREVIOUS_MESSAGE.substring(2, END_COUNT_INDEX)) + 1

        // Adjust message
        log.history[type][LAST_ITEM_INDEX] = `(x${COUNT}) ${log.getTime()}: ${message}`

        log.count[type] += 1

        return
      }
    }

    // Store
    log.history[type].push(`${log.getTime()}: ${message}`)
    log.count[type] += 1
  }

  log.latest = () => {
    // eslint-disable-next-line
    console.log(log.stringify('sequence', 10));
  }

  // Translate logs
  log.stringify = (type, preferredLength) => {
    // Translate the history for a type into a string
    const history = log.history[type]
    let translation = ''
    let historyLength = preferredLength

    if (!history) return translation

    if (!historyLength ||
      historyLength > history.length) {
      historyLength = history.length
    }

    for (let i = history.length - 1; i >= history.length - historyLength; i -= 1) {
      translation += `${history[i]}\n`
    }

    return translation
  }

  log.logToFile = (prefix, message, data) => {
    if (util === null) util = require('./util')()

    let text = `${log.serviceName} [${prefix.toUpperCase()}] (${log.count[prefix]}): ${message} \n`

    if (data !== undefined && data !== null) {
      text += `${data}\n`
    }
    util.createDir(log.directory)
      .then(() => {
        util.appendToFile(`${log.directory}${prefix}.log`, text)
      }).catch(err => {
        console.log(err)
      })
  }

  return log
}
