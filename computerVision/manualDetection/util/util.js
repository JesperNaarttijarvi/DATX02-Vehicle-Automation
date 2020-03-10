module.exports = () => {
  const util = {

  }

  util.escapeSpecialChars = (string) => {
    var replaceCharsAt = (str, chars, i) => {
      var prefix
      var suffix
      prefix = str.substring(0, i)
      if (i + 1 <= str.length) {
        suffix = str.substring(i + 1, str.length)
      } else {
        suffix = ''
      }
      return prefix + chars + suffix
    }
    for (var i = 0; i < string.length; i++) {
      var char = string[i]

      if (char === "'") {
        string = replaceCharsAt(string, "\\'", i)
        i = i + 2
      }
      if (char === '"') {
        string = replaceCharsAt(string, '\\"', i)
        i = i + 2
      }
    }
    return string
  }

  util.stringify = (string, _escapeSpecialChars) => {
    if (_escapeSpecialChars === undefined) _escapeSpecialChars = true
    var str = ''
    string = string + ''
    if (string.length === 0) return ''
    if (string.substring(0, 1) !== "'") {
      str +=  "'"
    }
    if (_escapeSpecialChars) {
      str = str + util.escapeSpecialChars(string)
    }

    if (string.substring(string.length - 1) !== "'") {
      str += "'"
    }

    return str
  }

  util.swap = (string, fromChar, toChar) => {
    string = string + ''
    var length = string.length
    for (var i = 0; i < length; i++) {
      if (string[i] === fromChar) {
        if ((i + 1) <= length) { // checks if we can take substring of i+1
          string = string.substring(0, i) + toChar + string.substring((i + 1))
        } else {
          string = string.substring(0, i) + toChar
        }
      }
    }
    return string
  }

  util.createDir = (location, safe) => new Promise((resolve, reject) => {
    const fs = require('fs')
      if (!fs.existsSync(location)) {
        fs.mkdir(location, (err) => {
          if (err) {
            log.error(`error when creating Directory in: ${location}`)
            reject(err)
          }
          resolve()
        })
      } else {
        resolve()
      }
  })


  util.appendToFile = (file, data) => new Promise((resolve, reject) => {
    const fs = require('fs')
    fs.appendFile(file, data, function (err) {
      if (err) reject(err)
      resolve('Saved to file')
    })
  })

  util.getDate = (daysBack = 0) => {
    const setOldDate = 0
    const date = new Date()
    date.setDate(date.getDate() - setOldDate - daysBack)
    return date
  }

  util.parseDate = (date) =>  {
    if (!(date instanceof Date)) date = new Date(date)

    let year = date.getFullYear() + ''
    let month = date.getMonth() + 1 + ''
    let day = date.getDate() + ''
    let hours = date.getHours() + ''
    let minutes = date.getMinutes() + ''
    let seconds = date.getSeconds() + ''

    if (month.length === 1) month = '0' + month
    if (day.length === 1) day = '0' + day
    if (hours.length === 1) hours = '0' + hours
    if (minutes.length === 1) minutes = '0' + minutes
    if (seconds.length === 1) seconds = '0' + seconds

    return util.stringify(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
  }

  util.getTimeStamp = () => {
    let timestamp = util.parseDate(util.getDate())
    timestamp = util.swap(timestamp, "'", '')

    return timestamp
  }

  return util
}
