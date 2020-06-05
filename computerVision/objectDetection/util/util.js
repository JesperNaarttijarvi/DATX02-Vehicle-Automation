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
            console.log(`error when creating Directory in: ${location}`)
            reject(err)
          }
          resolve()
        })
      } else {
        resolve()
      }
  })

  util.fileExists = (path) => new Promise((resolve, reject) => {
    const fs = require('fs')
    fs.access(path, fs.F_OK, (err) => {
      if (err) {
        resolve(false)
        return
      }

      resolve(true)
    })
  })



  util.zipDirectory = (source, out) => new Promise((resolve, reject) => {
    const archiver = require('archiver');
    const fs = require('fs');
    return new Promise((resolve, reject) => {

      const archive = archiver('zip', { zlib: { level: 9 }});
      const stream = fs.createWriteStream(out);


      archive
        .directory(source, false)
        .on('error', err => reject(err))
        .pipe(stream)

      // listen for all archive data to be written
      // 'close' event is f ired only when a file descriptor is involved
      stream.on('end', () => resolve());
      stream.on('close', () => resolve());
      archive.finalize();
    });
  })


  util.writeToFile = (file, data) => new Promise((resolve, reject) => {
    const fs = require('fs');

    fs.writeFile(file, data, function(err) {
        if(err) {
            reject(err)
        }
        resolve('ok')
    });
  })

  util.readFile = (file) => new Promise((resolve, reject) => {
    const fs = require('fs');

    fs.readFile(file, function(err, data) {
        if(err) {
            reject(err)
        }
        resolve(data)
    });
  })

  util.copyFile = (source, destination) => new Promise((resolve, reject) => {
    const fs = require('fs');
    // destination will be created or overwritten by default.
    fs.copyFile(source, destination, (err) => {
      if (err) reject(err);
      resolve()
    });
  })

  util.moveFile = (source, destination) => new Promise((resolve, reject) => {
    const fs = require('fs');

    const cb = (args) => {
      resolve(args)
    }

    const helper = (oldPath, newPath, callback) => {
        fs.rename(oldPath, newPath, function (err) {
          if (err) {
              if (err.code === 'EXDEV') {
                  copy();
              } else {
                  callback(err);
              }
              return;
          }
          callback();
      });

      const copy = () => {
          var readStream = fs.createReadStream(oldPath);
          var writeStream = fs.createWriteStream(newPath);

          readStream.on('error', callback);
          writeStream.on('error', callback);

          readStream.on('close', function () {
              fs.unlink(oldPath, callback);
          });

          readStream.pipe(writeStream);
      }
    }

    helper(source, destination, cb)
  })

  util.readAllFiles = (directory, suffixes) => new Promise((resolve, reject) => {
    const allFiles = []
    const fs = require('fs')

    fs.readdir(directory, (err, files) => {
      if (err) reject(err)

      files.forEach(file => {
        const fileDot = file.lastIndexOf('.')
        if (suffixes) {
          suffixes.forEach(suffix => {
            if (file.substring(fileDot + 1).toLowerCase() === suffix.toLowerCase()) {
              allFiles.push(`${directory}/${file}`)
            }
          });

        } else {
          allFiles.push(`${directory}/${file}`)
        }
      });
      resolve(allFiles)
    });
  })

  util.readAllDirectories = (directory) => new Promise((resolve, reject) => {
    const { lstatSync, readdir } = require('fs')
    const { join } = require('path')
    const isDirectory = source => lstatSync(source).isDirectory()

    readdir(directory, (err, files) => {
      if (err) reject(err)
      resolve(files.map(name => join(directory, name)).filter(isDirectory))
    });
  })

  util.readFileAndStats = (file) => new Promise(async (resolve, reject) => {
    try {
      let fileData = await util.readFile(file)
      let fileStats = await util.getFileStats(file)

      resolve({
        file: fileData,
        stats: fileStats
      })
    } catch (err) {
      reject(err)
    }
  })


  util.getFileStats = (file) => new Promise((resolve, reject) => {
    const fs = require('fs')

    fs.stat(file, (error, stats) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(stats)
      }
    });
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
