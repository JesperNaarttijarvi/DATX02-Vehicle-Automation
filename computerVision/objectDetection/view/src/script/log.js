let quantity = 0

export default (importingServiceName) => {
  let log = {
    serviceName: importingServiceName,
    print: true,
    separateFirstLog: true,
    types: {
      // For development
      debug: true,
      warning: true,
      info: true,
      todo: true,
      fixme: true,
      success: true,
      sequence: false
    },
    history: {
      error: [],
      debug: [],
      warning: [],
      info: [],
      todo: [],
      fixme: [],
      success: [],
      sequence: []
    },
    count: {
      error: 0,
      debug: 0,
      warning: 0,
      info: 0,
      todo: 0,
      fixme: 0,
      success: 0,
      sequence: 0
    },
    color: {
      debug: 'blue',
      warning: 'orange',
      info: 'blue',
      todo: 'purple',
      fixme: 'red',
      success: 'green',
      error: 'red'
    },
    loginTime: new Date()
  }

  // Functionality
  log.logToConsole = (prefix, message, ...data) => {
    if (!log.types[prefix] ||
      !log.print) {
      return
    }

    // Mark first log
    if (quantity === 0 && log.separateFirstLog === true) {
      // eslint-disable-next-line
      console.log(`

-----------------------
        Load 🎉
-----------------------

      `)
    }
    quantity++

    // eslint-disable-next-line
    console.log(`%c ${log.serviceName} [${prefix.toUpperCase()}] (${log.count[prefix]}): ${message}`, `color: ${log.color[prefix]}`);

    if (data) {
      // eslint-disable-next-line
      console.log(...data);
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
        // global.bugsnagClient.notify(message, { severity: type })
        break
      case 'warning':
        // global.bugsnagClient.notify(message, { severity: type })
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

  // Custom logs
  log.error = (message) => {
    // eslint-disable-next-line
    console.trace(`ERROR: (${log.count['error']})`, message);

    // Log sequences
    log.latest()

    log.storeToHistory('error', message)
  }

  // Translate logs
  log.stringify = (type, preferredLength) => {
    // Translate the history for a type into a string
    const history = log.history[type]
    let translation = ''
    let historyLength = preferredLength

    if (!historyLength ||
      historyLength > history.length) {
      historyLength = history.length
    }

    for (let i = history.length - 1; i >= history.length - historyLength; i -= 1) {
      translation += `${history[i]}\n`
    }

    return translation
  }

  ;
  (log.initialize = () => {
    for (let type in log.types) {
      log[type] = (message, ...data) => {
        log.logToConsole(type, message, ...data)
        log.storeToHistory(type, message)
      }
    }
  })()
  return log
}
