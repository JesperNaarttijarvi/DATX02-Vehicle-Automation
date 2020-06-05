<template>
  <div id="drawer">
      <div class="npc-card">
      <div
        style="order: 2; display: flex; width: 60%;"
        v-if="project.images[project.index]">

        <div style="margin: auto 0;">
           <h3 style="width: 100%; text-align: center;">Image {{Number(project.index) + 1}}</h3>
             <div style="position: relative;">
          <img
            v-on:load="imageChanged"
            ref="imageDetector"
            class="imageDetector noselect"
            :src="currentImage"
          />

          <Box v-if="creatingLabel"
            :top="creatingBox.top * image.h" :left="creatingBox.left * image.w"
            :width="creatingBox.width  * image.w" :height="creatingBox.height  * image.h"
            :label="creatingBox.label" :color="creatingBox.color"
            />
          <div v-for="(box, id) in project.boxes[project.images[project.index]]"
                    :key="id"
                    style="z-index: 1000;"
          >
          <Box :top="box.top * image.h" :left="box.left * image.w"
            :width="box.width * image.w" :height="box.height * image.h"
            :label="box.label"
            @click="removeBox(id)"
            />
             </div>
      </div>

        </div>
      </div>
      <section>
        <h3>Manual drawer</h3>
        <separator width="190px" backgroundColor="black" height="2px" />
        <p>
          <b>Manually draw detection lines</b>
          <br>
          <br>
           Use the shortcuts to draw boxes on images for AI training.
          <br>
          <br>
          </p>
        <div style="display: block; position: relative; width: 100%;">
            <b>Custom shortcuts for different detection objects, add them below. (?)</b>
            <el-tooltip>
              Shortcuts for handling images. Default shortcuts are enter, <br> right-arrow for next image and back, left-arrow for previous image.
            </el-tooltip>
          </div>
          <div class="inline">
          <input
            style="height: 30px; width: 30%;"
            placeholder="key"
            v-model="project.shortcut.key"
            />
            <input
            style="height: 30px; width: 30%; margin-left: 2px;"
            placeholder="model"
            v-model="project.shortcut.model"
            />
            <el-button secondary @click="addShortcut" style="margin-left: 10px;">Add</el-button>
          </div>
          <table id="shortcutTable" style="border: 1px solid #f0f0f0;">
            <thead>
              <tr>
                <th>Key</th>
                <th>Model</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="shortcut in project.shortcut.shortcuts"
                 :key="shortcut.key"
                style="margin-top:5px;">
                <td>{{shortcut.key}}</td>
                <td>{{shortcut.model}}</td>
                <td><el-button danger secondary @click="deleteShortcut(shortcut)">Radera</el-button></td>
              </tr>
            </tbody>
          </table>

        <br>
        <br>
             <div style="display: block; position: relative; width: 100%; margin-top: 10px;">
            Change image manually
            <el-tooltip>
              Jumpts to the selected image in order.
            </el-tooltip>
          </div>
         <div class="inline">

           <input
              style="height: 30px;"
              placeholder="1000"
              type="number"
              v-model="newIndex"
              />
              <el-button secondary @click="jumpToImage" style="margin-left: 10px;">Change</el-button>
        </div>
        <div style="text-aling: center; margin: 5px auto -15px auto; font-size: 20px;">
          <b>{{project.index}}</b> out of <b>{{project.total}}</b> images processed
        </div>


        <br>
        <br>
        <div class="inline" style="justify-content: center;">
         <el-button @click="saveProgress" style="height: 45px; font-size: 20px; margin-right: 10px;">Save progress</el-button>
        <el-button @click="goBack" danger style="height: 45px; font-size: 20px;">Go back</el-button>
        </div>
        <div style="margin-top:10px; height: 25px;">
            <p

          v-if="drawerFlag.state !== 0"
          :class="{
            errorMessage: drawerFlag.state === 2,
            confirmMessage: drawerFlag.state === 1,
            loadingMessage: drawerFlag.state === 3
          }"
        >
          <font-awesome-icon
            :icon="[
              'fas',
              drawerFlag.state === 2
                ? 'exclamation-triangle'
                : drawerFlag.state === 1
                ? 'check-circle'
                : 'spinner'
            ]"
            class="icon"
            :class="drawerFlag.state === 3 ? 'fa-spin' : null"
          ></font-awesome-icon>
          {{ drawerFlag.msg }}
        </p>
        </div>

      </section>
    </div>
  </div>
</template>

<script>
import Separator from './../components/Separator.vue'
import Box from './../components/Box.vue'
import logFile from './../script/log'
import drawerHandler from './../services/drawerHandler'
import router from '../router'

const log = logFile('Drawer')

export default {
  components: {
    Box,
    Separator
  },
  data () {
    return {
      image: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        h: 0,
        w: 0
      },
      mouse: {
        x: 0,
        y: 0
      },
      newIndex: 0,
      creatingLabel: false,
      creatingBox: {
        top: 600,
        left: 900,
        height: 50,
        width: 30,
        color: 'orange',
        label: ''
      },
      project: {
        projectName: 'projectName',
        imageSrc: '',
        frameDelay: 0,
        allowImages: [true],
        allowVideos: [true],
        boxes: {},
        shortcut: {},
        images: [],
        total: 0,
        index: 0
      },
      currentImage: '',
      right: true,
      isAsset: true,
      drawerFlag: {
        state: 0,
        msg: ''
      }
    }
  },
  props: {
    selectedProject: {
      required: true,
      type: String,
      default: 'defualt'
    },
  },
  async mounted () {
    this.$store.commit('resetLoading')
    window.addEventListener('keydown', e => {
      this.checkListeners(String.fromCharCode(e.keyCode), e.keyCode)
    })
    window.addEventListener('mouseup', e => {
      this.mouseup(e)
    })
    window.addEventListener('mousemove', e => {
      this.trackmouse(e)
    })
    window.addEventListener('resize', () => {
     this.updateImagePosition()
    })
    await this.loadProject()

    //this.searchImages()
  },
  computed: {

  },
// TODO
  //When changing image, press loading
  //Save when chagning image
  //Somehow boxes can get deleted, and all data is lost
  methods: {
    async loadProject () {
      try {
        this.$store.commit('setLoading')
        this.setFlag(3, 'Loading project')

        this.project = await drawerHandler.loadProject(this.selectedProject)
        this.changeImage(0)
        this.$store.commit('resetLoading')
        this.setFlag(1, 'Project loaded')
      } catch (err) {
        this.$store.commit('resetLoading')
        this.setFlag(2, err)
        log.error(err)
      }
    },
    setFlag (state, msg) {
      this.drawerFlag.state = state
      this.drawerFlag.msg = msg

      setTimeout(() => {
        this.drawerFlag.state = 0
      }, 3000)
    },
    jumpToImage () {
      if (this.project.index === Number(this.newIndex) - 1) {
        return
      }
      this.changeImage(Number(this.newIndex) - Number(this.project.index) - 1)
    },
    addShortcut () {
      if (this.shortcut.key === undefined || this.shortcut.key === '') {
        this.setFlag(2, 'Shortcut key is unset')
        return
      }
      if (this.shortcut.model === undefined || this.shortcut.model === '') {
        this.setFlag(2, 'Shortcut model is unset')
        return
      }
      this.project.shortcut.shortcuts.push({
        key: this.shortcut.key,
        model: this.shortcut.model
      })
    },
    deleteShortcut (shortcut) {
      this.project.shortcut.shortcuts.forEach((sc, index) => {
        if (sc.key === shortcut.key) {
          this.project.shortcut.shortcuts.splice(index, 1)
        }
      })
    },
    changeImage (index) {
      this.project.index = Number(this.project.index) + Number(index)
      if (this.project.index > this.project.images.length - 1) {
        this.project.index = this.project.images.length - 1
      }
      if (this.project.index < 0) {
        this.project.index = 0
      }
      this.newIndex = this.project.index + 1
      this.currentImage = `https://withtheboys.se/getImage/${this.project.images[this.project.index]}`
    },
    imageChanged () {
      console.log('imageChanged')
      this.updateImagePosition()
    },
    removeBox (id) {
      if (this.creatingLabel) return
      const index = this.project.images[this.project.index]
      const temp = this.project.boxes
      temp[index].splice(id, 1)
      this.project.boxes = {}
      this.project.boxes = temp
      setTimeout(() => {
        this.creatingLabel = false
      }, 20)
    },
    createLabel (label) {
      let top = (this.mouse.y / this.image.h)
      let left = (this.mouse.x / this.image.w)
      label = label || ''
      if (this.creatingLabel) {

        this.creatingLabel = false
        label = this.creatingBox.label
        let oldLeft = this.creatingBox.left
        let oldTop = this.creatingBox.top
        if (left < oldLeft) {
          let tmpLeft = left
          left = oldLeft
          oldLeft = tmpLeft
        }
        if (top < oldTop) {
          let tmpTop = top
          top = oldTop
          oldTop = tmpTop
        }

        let args =  {
          top: oldTop,
          left: oldLeft,
          height: top - oldTop,
          width: left - oldLeft,
          label: label
        }

        this.addLabel(args)
      } else {
        this.startNewLabel('', top, left)
      }
    },
    updateCreatingLabel () {
      this.updateImagePosition()

      let top = (this.mouse.y / this.image.h)
      let left = (this.mouse.x / this.image.w)

      let oldLeft = this.creatingBox.left
      let oldTop = this.creatingBox.top

      let newLeft = oldLeft
      let newTop = oldTop
      if (left < oldLeft) {
        newLeft -= oldLeft - left
        let tmpLeft = left
        left = oldLeft
        oldLeft = tmpLeft + oldLeft - left
      }
      if (top < oldTop) {
        newTop -= oldTop - top
        let tmpTop = top
        top = oldTop
        oldTop = tmpTop + oldTop - top
      }

      this.creatingBox.top = newTop
      this.creatingBox.left = newLeft
      this.creatingBox.height = top - oldTop
      this.creatingBox.width = left - oldLeft
    },
    startNewLabel (label, top, left) {
      this.creatingBox.top = top
      this.creatingBox.left = left
      this.creatingBox.height = 0
      this.creatingBox.width = 0
      this.creatingBox.label = label

      this.creatingLabel = true
    },
    addLabel (args) {
      const index = this.project.images[this.project.index]
      if (this.project.boxes[index] === undefined) {
        this.project.boxes[index] = []
      }

      this.project.boxes[index].push(args)
    },
    checkListeners (char, keyCode) {
      if (keyCode === 13) {
        this.jumpToImage()
        return
      }
      if (keyCode === 39) char = 'enter'
      if (keyCode === 37) char = 'back'
      if (keyCode === 27) char = 'escape'
      this.project.shortcut.shortcuts.forEach(sc => {
        if (sc.key.toLowerCase() === char.toLowerCase()) {
          if (sc.model.toLowerCase() === 'next image') {
            this.changeImage(1)
          } else if (sc.model.toLowerCase() === 'previous image') {
            this.changeImage(-1)
          } else if (sc.key.toLowerCase() === 'escape') {
            this.creatingLabel = false
          } else {
            this.updateImagePosition()
            const top = (this.mouse.y / this.image.h)
            const left = (this.mouse.x / this.image.w)
            if (this.isInsideImage()) {
              this.startNewLabel(sc.model, top, left)
            }
          }
        }
      })
    },
    isInsideImage() {
       //Mouse is in image container
      if (this.mouse.x >= 0 && this.mouse.y >= 0) {
        // Mouse is not down or to the right of image
        if (this.mouse.x <= this.image.w && this.mouse.y <= this.image.h) {
          return true
        }
      }
       return false
    },
    mouseup () {
      this.updateImagePosition()

      if (this.isInsideImage()) {
        setTimeout(() => {
           this.createLabel()
        }, 20)
      }
    },
    findPosition (oElement) {
      if (oElement !== undefined && typeof (oElement.offsetParent) !== 'undefined') {
        for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
          posX += oElement.offsetLeft
          posY += oElement.offsetTop
        }
        return [ posX, posY ]
      } else if (oElement !== undefined) {
        return [ oElement.x, oElement.y ]
      } else {
        return [0, 0]
      }
    },
    getCoordinates (e) {
      var PosX = 0
      var PosY = 0
      var ImgPos
      ImgPos = this.findPosition(this.$refs.imageDetector)
      if (!e) e = window.event
      if (e.pageX || e.pageY) {
        PosX = e.pageX
        PosY = e.pageY
      } else if (e.clientX || e.clientY) {
        PosX = e.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft
        PosY = e.clientY + document.body.scrollTop +
        document.documentElement.scrollTop
      }
      PosX = PosX - ImgPos[0]
      PosY = PosY - ImgPos[1]

      return { x: PosX, y: PosY }
    },
    updateImagePosition () {
      const img = this.$refs.imageDetector
      if (img === undefined) return
      this.image = {
        x1: img.getBoundingClientRect().left,
        y1: img.getBoundingClientRect().top,
        x2: img.getBoundingClientRect().right,
        y2: img.getBoundingClientRect().bottom,
        h: img.height,
        w: img.width
      }
    },
    trackmouse (event) {
      this.mouse = this.getCoordinates(event)
      if (this.creatingLabel) {
        this.updateCreatingLabel()
      }
    },
    goBack () {
      router.push({
        name: 'home',
        query: { selectedProject: this.selectedProject }
      })
    },
    async saveProgress () {
      this.setFlag(3, 'Saving progress')
      this.$store.commit('setLoading')
      try {
        const args = this.project
        await drawerHandler.saveProgress(args)
        this.setFlag(1, 'Progress saved')
        this.$store.commit('resetLoading')
      } catch (err) {
        log.error(err)
        this.$store.commit('resetLoading')
        this.setFlag(2, err.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./../styles/variables.less";
#drawer {
  max-width: 1900px;
  margin: 0 auto;
  padding-top: 10px;
  overflow: hidden;
}

.labelOverlay {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 90px;
  width: 40px;
  background: red;
  opacity: 0.3;
}

.imageDetector {
  width: 100%;
  object-fit: cover;
}
.imageDetector:hover{
  cursor: crosshair;
}
.inline {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
}

.custom-hotspot-blockView {
  height: 50px;
  width: 50px;
  background: #f0f0f0;
}

#instagram-container {
  background-color: @color-grey-light;
  transition: 0.3s ease-out;
  margin: 0 10px;
}
#instagram-loader {
  background-color: @color-grey-light;
  padding: 20px 0;
  width: 100%;
}
.icon {
  color: @color-grey-dark;
  width: auto;
  font-size: 80px;
}
.col {
  border-radius: @radius-small;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08);
  border: 2px solid white;
  flex: 1;
  height: auto;
  justify-content: center;
}
.col:not(:last-child) {
  margin-right: 10px;
}
.header {
  background: white;
  padding-top: @margin-small;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome, Opera and Firefox */
}
@media screen and (max-width: @xs-max-width) {
  .col {
    width: 100%;
    max-height: 200px;
    height: auto;
    margin-bottom: 5px;
  }
}

table {
  font-family: 'Open Sans', sans-serif;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px 0 0 0;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}

.col:hover {
  border-bottom-color: @color-secondary;
}

.npc-card {
  margin: 0px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
  justify-content: center;
  height: 50%;
  box-shadow: @shadow;
  border: 2px solid white;
  border-radius: @radius-small;
  width: calc(100% - 20px);
  transition: 1s;
}
.center {
  width: initial;
}
.small {
  max-height: 750px;
}
section {
  background: white;
  padding: 6vmin 8vmin;
  justify-content: center;
  flex: 1;
}

@media screen and (max-width: @xs-max-width) {
  img,
  .iframe {
    margin: 0 !important;
    order: 0 !important;
    max-height: 450px;
    min-height: 300px;
    width: 100% !important;
  }
  section {
    width: 100%;
  }
}

@media screen and (min-width: @lg-min-width) {
  .iframe {
    min-height: 500px;
  }
}

img,
.iframe {
  height: auto;
  width: 50%;
  object-fit: cover;
  border: none;
  border: 2px solid white;
}

@media (min-width: @sm-min-width) {
  .portrait {
    width: 20% !important;
  }
}

.noText {
  width: 100% !important;
  min-height: 700px;
}
@media screen and (max-width: @xs-max-width) {
  .noText {
    min-height: 400px;
  }
}

</style>
