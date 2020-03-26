const path = require('path')
const log = require('./util/log')('routes')
const qs = require('qs')

module.exports = function (args) {
  const app = args.app
  const express = args.express
  const debugg = true

  if (debugg) {
    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Token, Origin, X-Requested-With, Content-Type, Accept, Authorization')
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
      next()
    })
  }

  app.get('/loadProgress', async (req, res) => {
    const q = req.query
    const util = require('./util/util')()
    try {
      if (q !== undefined && q !== null && q.projectName) {
        let rawJSON = await util.readFile(`data/${q.projectName}/progress.json`)
        res.status(200).send(JSON.parse(rawJSON))
      } else {
        res.status(422).send('Not able to parse query')
      }
    } catch (err) {
      res.status(500).send('Project not found')
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

  app.post('/searchImages', async (req, res) => {
    try {
      const extractFrames = require('ffmpeg-extract-frames')
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
      const imageSrc = body.imageSrc
      if (imageSrc === undefined || imageSrc === null) {
        res.status(422).send('unknown imageSrc')
        return
      }
      const frameDelay = body.frameDelay
      if (frameDelay === undefined || frameDelay === null) {
        res.status(422).send('unknown frameDelay')
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
      const maxImages = body.maxImages
      if (maxImages === undefined || maxImages === null) {
        res.status(422).send('unknown maxImages')
        return
      }

      let imgTypes = ['jpg', 'jpeg', 'png', 'HEIF', 'JFIF']
      let videoTypes = ['mp4', 'avi', 'WEBM', 'MPEG', 'WMV']

      let images = []
      let videos = []

      if (allowImages) {
        images = await util.readAllFiles(imageSrc, imgTypes)
      }

      if (allowVideos) {
        videos = await util.readAllFiles(imageSrc, videoTypes)
      }

      let promises = []
      let counter = 0

      await util.createDir(`./data/${projectName}`)

      log.info(`Found ${images.length} images and ${videos.length} videos, processing them now`)

      images.forEach(async (image) => {
        const fileDot = image.lastIndexOf('.')
        const suffix = image.substring(fileDot + 1)
        const destination = `data/${projectName}/img-i${counter}.${suffix}`
        counter++
        promises.push(util.copyFile(image, destination))
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
        promises.push(extractFrames(extractFramesArgs))
      })

      Promise.all(promises).then(async (values) => {
        let files = await util.readAllFiles(`data/${projectName}`, imgTypes.concat(videoTypes))
        let maxLength = files.length
        if (Number(maxImages) > 0) {
          if (maxLength > maxImages) maxLength = maxImages
        }

        const response = {
          start: 0,
          stop: maxLength,
          maxImages,
          index: 0,
          total: files.length,
          images: files.splice(0, maxLength)
        }

        res.status(200).send(response)
      })
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  app.use('/getImage', express.static('./'))

  app.get('/yolov3Tiny', (req, res) => {
    const file = 'yolov3-tiny.weights'

    const path = `./data/${file}`
    res.download(path) // Set disposition and send it.
  })

  app.get('/aiBig', (req, res) => {
    const file = 'aiTrainingSantaMonica.mp4'

    const path = `./data/${file}`
    res.download(path) // Set disposition and send it.
  })

  app.get('/aiSmall', (req, res) => {
    const file = 'santaMonicaShort2.mp4'

    const path = `./data/${file}`
    res.download(path) // Set disposition and send it.
  })

  app.get('/downloadDarknetYao', (req, res) => {
    const file = `./data/darknet.zip`
    res.download(file) // Set disposition and send it.
  })

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}
