const path = require('path')
const config = require('./config/config')
const log = require('./util/log')('routes')
const db = require('./util/database')(config.db.connection)
const qs = require('qs')
const axios = require('axios')
const multer = require('multer')

// In memory progess.json for automatic training
const automaticTraining = {}


const getImageDimensions = (imgSrc) => new Promise((resolve, reject) => {
  const sizeOf = require('image-size');
  sizeOf(imgSrc, function (err, dimensions) {
    if (err) {
      reject(err)
      return
    }

    resolve({
      w: dimensions.width,
      h: dimensions.height
    })
  });
})

const writeImagesAndVideos = (args) => new Promise(async (resolve, reject) => {
  const extractFrames = require('ffmpeg-extract-frames')
  const util = require('./util/util')()

  projectName = args.projectName
  frameDelay = args.frameDelay
  fps = args.fps
  allowImages = args.allowImages
  allowVideos = args.allowVideos
  shortcut = args.shortcut
  boxes = args.boxes
  classes = args.classes
  customWeight = args.customWeight

  try {
    let imgTypes = ['jpg', 'jpeg', 'png', 'HEIF', 'JFIF']
    let videoTypes = ['mp4', 'avi', 'WEBM', 'MPEG', 'WMV', 'mov']

    let images = []
    let videos = []

    if (allowImages) {
      images = await util.readAllFiles(`./data/${projectName}/tmp/`, imgTypes)
    }

    if (allowVideos) {
      videos = await util.readAllFiles(`./data/${projectName}/tmp/`, videoTypes)
    }

    let promises = []
    let counter = 0

    log.info(`Found ${images.length} images and ${videos.length} videos, processing them now`)

    images.forEach(async (image) => {
      const fileDot = image.lastIndexOf('.')
      const suffix = image.substring(fileDot + 1)
      const destination = `data/${projectName}/img-i${counter}.${suffix}`
      counter++
      promises.push(util.moveFile(image, destination))
    })

    videos.forEach(async (video) => {
      let extractFramesArgs = {
        input: video,
        output: `data/${projectName}/img-v${counter}-%d.png`
      }
      counter++
      if (Number(frameDelay) > 0) {
        extractFramesArgs.offset = [Number(frameDelay)]
      }
      if (Number(fps) > 0) {
        extractFramesArgs.fps = Number(fps)
      }
      promises.push(extractFrames(extractFramesArgs))
    })

    Promise.all(promises).then(async () => {
      let files = await util.readAllFiles(`data/${projectName}`, imgTypes.concat(videoTypes))
      let maxLength = files.length

      const args2 = {
        projectName: projectName,
        imageSrc: `data/${projectName}/`,
        frameDelay,
        allowImages,
        allowVideos,
        shortcut,
        images: files,
        total: maxLength,
        index: 0,
        boxes: boxes,
        classes,
        customWeight,
        isMarking: customWeight,
        automaticMarking: 0,
      }

      resolve(args2)
    })
  } catch (err) {
    reject(err)
  }
})


const readVideo = async (fs, path, res, req) => {
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1
    const chunksize = (end - start) + 1
    const file = fs.createReadStream(path, { start, end })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
}

// SET STORAGE
const imageStorage = multer.diskStorage({
  destination:  async (req, file, cb) => {
    const util = require('./util/util')()
    const { projectName } = req.query
    await util.createDir(`./data/${projectName}`)
    await util.createDir(`./data/${projectName}/tmp`)
    cb(null, `./data/${projectName}/tmp`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const uploadProjectFiles = multer({
  storage: imageStorage
}).array("projectImages", 1000); //Field name and max count


// SET STORAGE
const weightStorage = multer.diskStorage({
  destination:  async (req, file, cb) => {
    const util = require('./util/util')()
    const { projectName } = req.query
    await util.createDir(`./data/${projectName}`)
    await util.createDir(`./data/${projectName}/weight`)
    cb(null, `./data/${projectName}/weight`)
  },
  filename: function (req, file, cb) {
    cb(null, 'custom.weight');
  }
})

const uploadProjectWeight = multer({
  storage: weightStorage
}).array("projectWeight", 1000); //Field name and max count



module.exports = function (args) {
  const app = args.app
  const express = args.express
  const debugg = true;
  const observer = args.observer

  if (debugg) {
    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Token, Origin, X-Requested-With, Content-Type, Accept, Authorization')
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
      next()
    })
  }

  app.get('/checkAutomaticMarking', async (req, res) => {
    const util = require('./util/util')()
    const q = req.query
    try {
      if (q !== undefined && q !== null && q.projectName) {
        const progress = automaticTraining[q.projectName]

        if (progress === undefined) {
          res.status(200).send({
            isDone: true,
            progress: 0,
            images: 0
          })
          return
        }

        const respone = await axios.get(`http://10.0.0.68:8081/checkAutomaticMarking?projectName=${q.projectName}`)
        const data = respone.data

        // check the progress
        res.status(200).send({
          isDone: !progress.isMarking,
          progress: data.progress,
          images: progress.total
        })

      } else {
        res.status(422).send('Not able to parse query')
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Project not found')
    }
  })

  app.get('/getCustomWeight', async (req, res) => {
    const q = req.query
    try {
      if (q !== undefined && q !== null && q.projectName) {
        res.download(`data/${q.projectName}/weight/custom.weight`)
      } else {
        res.status(422).send('Not able to parse query')
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Project not found')
    }
  })

  app.get('/getCustomConfig', async (req, res) => {
    const util = require('./util/util')()
    const q = req.query
    try {
      if (q !== undefined && q !== null && q.projectName && q.classes) {
        const custConf = require('./util/yoloCustomConfig.js')
        await util.writeToFile(`data/${q.projectName}/weight/custom.cfg`, custConf.getConfig(Number(q.classes), false))

        res.download(`data/${q.projectName}/weight/custom.cfg`)
      } else {
        res.status(422).send('Not able to parse query')
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Project not found')
    }
  })


  app.get('/finishAutomaticMarking', async (req, res) => {
    const util = require('./util/util')()
    const q = req.query
    try {
      if (q !== undefined && q !== null && q.projectName && q.index) {
        const progress = automaticTraining[q.projectName]

        progress.isMarking = false
        progress.automaticMarking = q.index

        await util.writeToFile(`data/${q.projectName}/progress.json`, JSON.stringify(progress))
        automaticTraining[q.projectName] = undefined

        res.status(200).send('OK')
      } else {
        res.status(422).send('Not able to parse query')
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Project not found')
    }
  })


app.post('/finishAutomaticMarking', async (req, res) => {
  const util = require('./util/util')()
  const body = qs.parse(req.body)

  if (body === undefined || body === null) {
    res.status(200).send('no boxes')
    return
  }

  const projectName = body.projectName
  if (projectName === undefined || projectName === null) {
    res.status(200).send('no boxes')
    return
  }

  const boxes = body.boxes

  try {
    if (boxes !== undefined && automaticTraining[projectName] !== undefined) {
      const promises = []

      const boxKeys = Object.keys(boxes)
      boxKeys.forEach(image => {
        //boxkey === image
        const promise = getImageDimensions(image)
        promises.push(promise)

        promise.then(imageDimensions => {
          const newBoxes = []

          image.forEach(box => {
            const xCenter = Number(box.box.x) / imageDimensions.w
            const yCenter = Number(box.box.y) / imageDimensions.h
            const height = Number(box.box.h) / imageDimensions.h
            const width = Number(box.box.w) / imageDimensions.w

            let left = Number(xCenter) - (0.5 * Number(width))
            let top = Number(yCenter) - (0.5 * Number(height))

            const newBox = {
              label: box.name,
              prob: box.prob,
              top,
              left,
              height,
              width
            }

            newBoxes.push(newBox)
          });

          if (automaticTraining[projectName] === undefined) {
            return
          }

          if (automaticTraining[projectName].boxes === undefined) {
            automaticTraining[projectName].boxes = {}
          }

          if (automaticTraining[projectName].boxes[image]) {
            const oldBoxes = automaticTraining[projectName].boxes[image]
            automaticTraining[projectName].boxes[image] = oldBoxes.concat(newBoxes)
          } else {
            automaticTraining[projectName].boxes[image] = newBoxes
          }
        })
      })


      Promise.all(promises).then(async () => {
        setTimeout(async () => {
          const progress = automaticTraining[projectName]

          progress.isMarking = false
          progress.automaticMarking = q.index

          await util.writeToFile(`data/${projectName}/progress.json`, JSON.stringify(progress))
          automaticTraining[projectName] = undefined

          res.status(200).send('OK')
        }, 250)
      })
    } else {
      res.status(200).send('no boxes')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Project not found')
  }
})

  app.post('/setProjectBoxes', async (req, res) => {
    try {
      const util = require('./util/util')()
      const body = qs.parse(req.body)

      if (body === undefined || body === null) {
        res.status(200).send('no boxes')
        return
      }

      const projectName = body.projectName
      if (projectName === undefined || projectName === null) {
        res.status(200).send('no boxes')
        return
      }

      const image = body.image
      if (image === undefined || image === null) {
        res.status(200).send('no boxes')
        return
      }

      const boxes = body.boxes

      if (boxes !== undefined && automaticTraining[projectName] !== undefined) {
        const imageDimensions = await getImageDimensions(image)

        const newBoxes = []

        boxes.forEach(box => {
          const xCenter = Number(box.box.x) / imageDimensions.w
          const yCenter = Number(box.box.y) / imageDimensions.h
          const height = Number(box.box.h) / imageDimensions.h
          const width = Number(box.box.w) / imageDimensions.w

          let left = Number(xCenter) - (0.5 * Number(width))
          let top = Number(yCenter) - (0.5 * Number(height))

          const newBox = {
            label: box.name,
            prob: box.prob,
            top,
            left,
            height,
            width
          }

          newBoxes.push(newBox)
        });


        if (automaticTraining[projectName] === undefined) {
          return
        }

        if (automaticTraining[projectName].boxes === undefined) {
          automaticTraining[projectName].boxes = {}
        }

        if (automaticTraining[projectName].boxes[image]) {
          const oldBoxes = automaticTraining[projectName].boxes[image]
          automaticTraining[projectName].boxes[image] = oldBoxes.concat(newBoxes)
        } else {
          automaticTraining[projectName].boxes[image] = newBoxes
        }
        res.status(200).send('ok')
      } else {
        res.status(200).send('no boxes')
      }
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })


  app.get('/downloadProject', async (req, res) => {
   // const { promisify } = require('util');
   // const sizeOf = promisify(require('image-size'));
    const util = require('./util/util')()
    const custConf = require('./util/yoloCustomConfig.js')
    const q = req.query
    const timestamp = `project${new Date().getTime()}`
    try {
      if (q !== undefined && q !== null && q.projectName) {
        const promises = []
        const customDir = `custom/${timestamp}/`
        const outDir = `out/${q.projectName}.zip`
        const rawJSON = await util.readFile(`data/${q.projectName}/progress.json`)
        const progress = JSON.parse(rawJSON)
        const boxes = progress.boxes

        const boxKeys = Object.keys(boxes)
        const classes = ['center road mark line', 'outer road mark line', 'truck']
        const images = []

        await util.createDir(customDir)
        await util.createDir(`${customDir}custom/`)
        await util.createDir(`${customDir}custom/data/`)
        await util.createDir(`${customDir}custom/cfg/`)
        await util.createDir(`${customDir}data/`)
        await util.createDir(`${customDir}data/${q.projectName}`)

        boxKeys.forEach(async (boxKey) => {
          const dotIndex = boxKey.lastIndexOf(".")
          const imageEnding = (boxKey.substr(dotIndex))
          const imageLocation = (boxKey.substr(0, dotIndex))
          const filePath = `${customDir}${imageLocation}.txt`
          const imageBoxes = boxes[boxKey]
          let fileData = ''
          // const dimensions = await sizeOf(boxKey)
          imageBoxes.forEach(box => {
            let label = box.label.trim()
            label = label.toLowerCase()
            let labelIndex = classes.indexOf(label);
            if (labelIndex < 0) {
              classes.push(label)
              labelIndex = classes.length - 1
            }

            let xCenter = Number(box.left) + (0.5 * Number(box.width))
            let yCenter = Number(box.top) + (0.5 * Number(box.height))

            fileData += `${labelIndex} ${xCenter} ${yCenter} ${box.width} ${box.height} \n`
          });
          images.push(`./${boxKey}`)
          fileData = fileData.substring(0, fileData.length - 3)
          promises.push(util.writeToFile(filePath, fileData))
          promises.push(util.copyFile(boxKey, `${customDir}${imageLocation}${imageEnding}`))
        });
        // To let the first image be processed and a promised loaded
        setTimeout(
          () => {
            Promise.all(promises).then(async () => {
              await util.writeToFile(`${customDir}custom/data/custom.data`, `classes = ${classes.length}\ntrain = custom/data/train.txt\ntrain = custom/data/train.txt\names = custom/data/custom.names\nvalid = custom/data/test.txt\nbackup = backup/`)
              await util.writeToFile(`${customDir}custom/cfg/yolov3-custom.cfg`, custConf.getConfig(classes.length))
              await util.writeToFile(`${customDir}custom/data/classes.names`, classes.join('\n'))
              await util.writeToFile(`${customDir}custom/data/train.txt`, images.join('\n'))
              setTimeout(() => {
                res.download(outDir); // Set disposition and send it.
              }, 20000)
              await util.zipDirectory(customDir, outDir)
              setTimeout(() => {
                console.log(`TODO: DELTE DIR ${customDir}`)
              }, 1000 * 60 * 30) // Deletes after 30 mins
            })

          }, 100)

      } else {
        res.status(422).send('Not able to parse query')
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Project not found')
    }
  })

  app.get('/loadProgress', async (req, res) => {
    const q = req.query
    const util = require('./util/util')()
    try {
      if (q !== undefined && q !== null && q.projectName) {
        console.log(q.projectName)
        let rawJSON = await util.readFile(`./data/${q.projectName}/progress.json`)
        res.status(200).send(JSON.parse(rawJSON))
      } else {
        res.status(422).send('Not able to parse query')
      }
    } catch (err) {
      res.status(500).send('Project not found')
    }
  })

  app.post("/kandidat/uploadProjectFiles", function(req, res) {
    uploadProjectFiles(req, res, function(err) {
      if (err) {
          console.log(err)
          return res.status(400).end("Something went wrong!");
        }
      console.log('swag')
        return res.end("Files uploaded sucessfully!");
    });
  });

  app.post("/kandidat/uploadProjectWeights", function (req, res) {
    console.log('uploadProjectWeights')
    uploadProjectWeight(req, res, function(err) {
      if (err) {
          console.log(err)
          return res.status(400).end("Something went wrong!");
        }
        console.log('swag')
        return res.end("Files uploaded sucessfully!");
    });
  });

  app.post('/uploadNewProject', async (req, res) => {
    try {
      const extractFrames = require('ffmpeg-extract-frames')
      const util = require('./util/util')()
      const body = qs.parse(req.body)

      if (body === undefined || body === null) {
        res.status(422).send('unknown body')
        return
      }
      const projectName = body.name
      if (projectName === undefined || projectName === null) {
        res.status(422).send('unknown projectName')
        return
      }

      const frameDelay = body.frameDelay
      if (frameDelay === undefined || frameDelay === null) {
        res.status(422).send('unknown frameDelay')
        return
      }
      const fps = body.fps
      if (fps === undefined || fps === null) {
        res.status(422).send('unknown fps')
        return
      }
      const allowImages = body.allowImages
      if (allowImages === undefined || allowImages === null) {
        res.status(422).send('unknown allowImages')
        return
      }
      const allowVideos = body.allowVideos
      if (allowVideos === undefined || allowVideos === null) {
        res.status(422).send('unknown allowVideos')
        return
      }
      const shortcut = body.shortcut
      if (shortcut === undefined || shortcut === null) {
        res.status(422).send('unknown shortcut')
        return
      }

      let boxes = body.boxes
      if (boxes === undefined || boxes === null) {
       boxes = {}
      }
      const classes = body.classes
      if (classes === undefined || classes === null) {
        res.status(422).send('unknown classes')
        return
      }

      const customWeight = body.customWeight
      if (customWeight === undefined || customWeight === null) {
        res.status(422).send('unknown customWeight')
        return
      }

      const args = await writeImagesAndVideos({
        projectName,
        frameDelay,
        fps,
        allowImages,
        allowVideos,
        shortcut,
        boxes,
        classes,
        customWeight
      })

      if (body.created) {
        args.created = body.created
      }

      await util.writeToFile(`data/${projectName}/progress.json`, JSON.stringify(args))

        res.status(200).send(args)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  app.post('/saveProgress', async (req, res) => {
    try {
      const util = require('./util/util')()
      const body = qs.parse(req.body)

      if (body === undefined || body === null) {
        res.status(422).send('unknown body')
        return
      }

      const projectName = body.projectName
      if (projectName === undefined || projectName === null) {
        res.status(422).send('unknown projectName')
        return
      }

      await util.writeToFile(`data/${projectName}/progress.json`, JSON.stringify(body))
      res.status(200).send('ok')
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  app.get('/getProjects', async (req, res) => {
    const util = require('./util/util')()
    try {
      const projects = []
      const promises = []
      const projectDirs = await util.readAllDirectories('./data/')
      projectDirs.forEach(async (projectDir, index) => {
        const fileExists = await util.fileExists(`${projectDir}/progress.json`)
        if (fileExists) {
          promises.push(util.readFileAndStats(`${projectDir}/progress.json`))
        }
      });
      setTimeout(() => {
        Promise.all(promises).then(allProjects => {
          allProjects.forEach((projectFile, index) => {
            let progress = JSON.parse(projectFile.file)
            let stats = projectFile.stats

            let birthtime = util.parseDate(new Date(stats.birthtime))
            let mtime = util.parseDate(new Date(stats.mtime))
            let boxes = 0
            let boxKeys = Object.keys(progress.boxes)
            let isMarking = progress.isMarking
            boxKeys.forEach(bk => {
              boxes += progress.boxes[bk].length
            });
            let created = progress.created
            let modified =  mtime.substring(1, mtime.length - 1)
            projects.push([
              index,
              progress.projectName,
              progress.total,
              boxes,
              created,
              modified,
              isMarking
            ])
          });
          res.status(200).send({
            projects
          })
        })
        return
      }, 300)

    } catch (err) {
      log.error(err)
      res.status(422).send(err)
    }
  })

  app.use('/getImage', express.static('./'))


  app.get('/image', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', '/images/logo.png'))
  })

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}


