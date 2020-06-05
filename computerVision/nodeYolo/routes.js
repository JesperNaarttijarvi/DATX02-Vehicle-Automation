const config = require('./config/config')
const log = require('./util/log')('routes')
const axios = require('axios')
const fs = require('fs')
const qs = require('qs')
const { Darknet } = require('darknet')

const marking = {
  isMarking: false,
  projects: {}
}

const download = async (url, dir, file) => {

}

const downloadWeight = async (projectName) => {
  const url = `https://withtheboys.se/getCustomWeight?projectName=${projectName}`
  const writer = fs.createWriteStream(`./custom/${projectName}/custom.weights`)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

const downloadConfig = async (projectName) => {
  const url = `https://withtheboys.se/getCustomConfig?projectName=${projectName}&classes=${marking[projectName].classes.length}`

  const writer = fs.createWriteStream(`./custom/${projectName}/custom.cfg`)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

const downloadImage = async (projectName, image, imageName) => {
  const url = `https://withtheboys.se/getImage/${image}`
  const writer = fs.createWriteStream(`./custom/${projectName}/${imageName}`)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

const detectImage = async (projectName, imageName) => {
    const image = `./custom/${projectName}/${imageName}`
    return (marking[projectName].darknet.detect(image));
}




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

  app.post('/startAutomaticMarking', async (req, res) => {
    let sentHeaders = false
    let done = false
    try {
      const util = require('./util/util')()
      const body = qs.parse(req.body)
      console.log(body)
      if (body === undefined || body === null) {
        res.status(422).send('unknown body')
        return
      }

      const projectName = body.projectName
      if (projectName === undefined || projectName === null) {
        res.status(422).send('unknown projectName')
        return
      }

      const classes = body.classes
      if (classes === undefined || classes === null) {
        res.status(422).send('unknown classes')
        return
      }

      const images = body.images
      if (images === undefined || images === null) {
        res.status(422).send('unknown images')
        return
      }

      if (marking.isMarking) {
        res.status(500).send('Server is already marking a project')
        return
      } else {
        marking.isMarking = true
        marking[projectName] = {
          isDone: false,
          progress: 0,
          classes: classes.split(','),
          images
        }
      }
      res.status(200).send('ok')
      sentHeaders = true
      await util.createDir('./custom/')
      await util.createDir(`./custom/${projectName}/`)
      await downloadWeight(projectName)
      await downloadConfig(projectName, classes)

      marking[projectName].darknet = new Darknet({
          weights: `./custom/${projectName}/custom.weights`,
          config: `./custom/${projectName}/custom.cfg`,
          names: marking[projectName].classes
      });

      let offset = 15
      console.log(`Images start (${images.length} images)`)

      images.forEach(async (image, index) => {
        setTimeout(async () => {

            console.log(`Images ${index + 1} of ${images.length}`)


          const imageNameIndex = image.lastIndexOf('/');
          const imageName = image.substring(imageNameIndex + 1);
          await downloadImage(projectName, image, imageName)
          const boxes = await detectImage(projectName, imageName)

          if (marking[projectName].boxes === undefined) {
            marking[projectName].boxes = {}
          }
          if (marking[projectName].boxes[image]) {
            const oldBoxes = marking[projectName].boxes[image]
            marking[projectName].boxes[image] = oldBoxes.concat(boxes)
          } else {
            marking[projectName].boxes[image] = boxes
          }

          const data = {
            projectName,
            image,
            boxes
          }
          await axios(
            {
              method: 'post',
              url: 'https://withtheboys.se/setProjectBoxes',
              data: qs.stringify(data)
            })

          marking[projectName].progress = index + 1
          if (index + 1 >= images.length) done = true
        }, 5 * offset * index)
      });

      // Saftey fallback to cancle loop if something went wrong
      setTimeout(() => {
        done = true
      }, 25 * offset * images.length)


      let interval = setInterval(async () => {
        if (done) {
          clearInterval(interval)
          console.log('marking done, finishAutomaticMarking')
          await axios.get(`https://withtheboys.se/finishAutomaticMarking?projectName=${projectName}&index=${images.length}`)
          /*
          const data = {
            projectName,
            boxes: marking[projectName].boxes
          }
          await axios(
            {
              method: 'post',
              url: 'https://withtheboys.se/setProjectBoxes',
              data: qs.stringify(data)
            })
          */
          marking.isMarking = false
          marking.darknet = undefined
          marking[projectName] = undefined
        }
      }, 100)

      return
    } catch (err) {
      marking.isMarking = false
      log.error(err)
      if (sentHeaders) return
      res.status(500).send(err.message)
    }
  })

  app.get('/checkAutomaticMarking', async (req, res) => {
    const q = req.query
    try {
      if (q !== undefined && q !== null && q.projectName) {
        res.status(200).send(marking[q.projectName])
        return
      }
      res.status(422).send('Not able to parse query')
      return
    } catch (err) {
      log.error(err)
      res.status(500).send('Project not found')
    }
  })
}
