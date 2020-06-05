<template>
  <div id="drawer">
      <div class="npc-card">
      <section>
        <h3>Projects overview</h3>
        <separator width="190px" backgroundColor="black" height="2px" />
        <p>
          <b>Select a project or create a new one</b>
          <br>
          <br>
        </p>

        <div style="width:900px">
          <vue-table-dynamic
            @row-click="changeProject"
            :params="projectTable"
            ref="projectTable">
          </vue-table-dynamic>
        </div>
        <br>
        <br>
        <div class="inline" style="justify-content: center;">
         <el-button @click="loadProject" :disabled="selectedProject === null || isMarking(selectedProject)" style="height: 45px; font-size: 20px; margin-right: 10px;">Load selected project</el-button>
          <el-button @click="editProject"  :disabled="selectedProject === null || isMarking(selectedProject)" danger secondary style="height: 45px; font-size: 20px; margin-right: 10px;">Edit project</el-button>
           <el-button @click="downloadProject" :disabled="selectedProject === null" secondary style="height: 45px; font-size: 20px; margin-right: 10px;">Download project</el-button>
         <el-button @click="createNewProject" secondary style="height: 45px; font-size: 20px;">Create new project</el-button>

        </div>
        <p
          style="margin-top:10px;"
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
      </section>
    </div>
    <el-modal v-if="creatingProject">
        <h3 style="margin-bottom: 10px;">Create a new project</h3>
        <div class="inline">
          <div style="display: flex; flex-direction: column; width: 50%; ">
            <b>Name of project:</b>
            <input
              style="height: 30px;margin-top: 5px;"
              placeholder="Unique project name"
              v-model="newProject.name"
              />
            </div>
            <div style="display: flex; flex-direction: column; margin-left: 20px;">
              <b>Allowed filetypes:</b>
              <div class="inline">
                <el-checkbox
                 style="margin-right: 10px; margin-top: 5px;"
                :options="[
                {
                  value: 'true',
                  label: 'Images'
                }]"
                v-model="newProject.allowImages"
                />
                <el-checkbox
                style="margin-right: 10px; margin-top: 5px;"
                :options="[
                  {
                  value: 'true',
                  label: 'Videos'
                }]"
                v-model="newProject.allowVideos"
                />
            </div>
          </div>
        </div>

         <div
            v-if="newProject.allowVideos[0] === 'true'">
            <div style="display: block; position: relative; width: 100%; margin-top: 10px;">
              <b>Delay between images from video (1000 is 1 second, 0 is every frame) (?)</b>
            <el-tooltip>
              A 30 second video with 30fps will result in 900 images. <br>
              To limit this we can for example use a delay of 100ms, <br>
              this will result in 300 images with 10fps.
            </el-tooltip>
          </div>
            <input
              style="height: 30px;margin-top: 5px;"
              placeholder="1000"
              type="number"
              v-model="newProject.frameDelay"
              />
          </div>
           <div
            v-if="newProject.allowVideos[0] === 'true'">
            <div style="display: block; position: relative; width: 100%; margin-top: 10px;">
              <b>Video FPS (?)</b>
            <el-tooltip>
              Scales down the video and only extract the exact FPS. If 0, all frames are taken
            </el-tooltip>
          </div>
            <input
              style="height: 30px;margin-top: 5px;"
              placeholder="1000"
              type="number"
              v-model="newProject.fps"
              />
          </div>

          <div style="display: block; position: relative; width: 100%;  margin-top: 10px;">
            <b>Image directory:</b>
          </div>

          <div class="inline">
          <input
            ref="imagesInput"
            name='projectImages'
            type="file"
            webkitdirectory
            directory
            multiple
            />
          </div>
                 <div v-if="newProject.images.length > 0">
            <div>
              <b>{{newProject.images.length}}</b> images already uploaded
            </div>
          </div>
           <div style="display: block; position: relative; width: 100%;  margin-top: 15px;">
            <b>Upload pre-trained weights: (?)</b>
             <el-tooltip>
              Run a trained neural network for YOLOv3 on the dataset. The neural network uses the YOLOV3 config and darknet53.conv as configs, and autmatically changes the upon uploaded classes. The program will run the neural network on all the images and map out images.
            </el-tooltip>
          </div>
           <el-checkbox
                 style="margin-right: 10px; margin-top: 5px; font-size: 20px;"
                :options="[
                {
                  value: 'true',
                  label: 'Run automatic detection'
                }]"
                v-model="newProject.allowWeights"
                />

          <div
            v-if="newProject.allowWeights[0] === 'true'">
            <div style="display: block; position: relative; width: 100%; margin-top: 10px;">
              Classes (?)
              <el-tooltip>
                Write the classes in the pretrained weight. Separate with "," like this: truck, inner road marking, outer road marking
              </el-tooltip>
              <input
                style="height: 30px;margin-top: 5px;"
                placeholder="Ex: car, truck, stop sign"
                v-model="newProject.classes"
                />
            </div>
            <div style="display: block; position: relative; width: 100%;  margin-top: 10px;">
              <b>Weight file:</b>
            </div>

            <div class="inline">
              <input
                ref="weightFile"
                name='projectImages'
                type="file"
                />
            </div>
          </div>
           <div style="display: block; position: relative; width: 100%;  margin-top: 10px;">
            <b>Custom shortcuts for different detection objects, add them below. (?)</b>
            <el-tooltip>
              Shortcuts for handling images. Default shortcuts are enter, <br> right-arrow for next image and back, left-arrow for previous image.
            </el-tooltip>
          </div>
          <div class="inline">
            <input
              style="height: 30px; width: 30%;"
              placeholder="key"
              v-model="newProject.shortcut.key"
              />
              <input
              style="height: 30px; width: 30%; margin-left: 2px;"
              placeholder="model"
              v-model="newProject.shortcut.model"
              />
              <el-button secondary @click="addShortcut" style="margin-left: 10px;">Add</el-button>
          </div>
          <table id="shortcutTable" style="border: 1px solid #f0f0f0; width: 100%;">
            <thead>
              <tr>
                <th>Key</th>
                <th>Model</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="shortcut in newProject.shortcut.shortcuts"
                 :key="shortcut.key"
                style="margin-top:5px;">
                <td>{{shortcut.key}}</td>
                <td>{{shortcut.model}}</td>
                <td><el-button danger secondary @click="deleteShortcut(shortcut)">Radera</el-button></td>
              </tr>
            </tbody>
          </table>

        <div class="inline" style="justify-content: center; margin-top: 30px;">
         <el-button @click="cancelProject" danger secondary style="height: 45px; font-size: 20px; margin-right: 10px;">Cancel project</el-button>
         <el-button @click="createProject" secondary :disabled="isMarking(newProject.name)" style="height: 45px; font-size: 20px;">Create project</el-button>
        </div>
          <p
          style="margin-top:10px;"
          v-if="newProjectFlag.state !== 0"
          :class="{
            errorMessage: newProjectFlag.state === 2,
            confirmMessage: newProjectFlag.state === 1,
            loadingMessage: newProjectFlag.state === 3
          }"
        >
          <font-awesome-icon
            :icon="[
              'fas',
              newProjectFlag.state === 2
                ? 'exclamation-triangle'
                : newProjectFlag.state === 1
                ? 'check-circle'
                : 'spinner'
            ]"
            class="icon"
            :class="newProjectFlag.state === 3 ? 'fa-spin' : null"
          ></font-awesome-icon>
          {{ newProjectFlag.msg }}
        </p>
    </el-modal>
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic'
import Separator from './../components/Separator.vue'
import logFile from './../script/log'
import drawerHandler from '../services/drawerHandler'
import router from '../router'

const log = logFile('Home')

export default {
  components: {
    Separator,
    VueTableDynamic
  },
  data () {
    return {
      newProject: {
        created: null,
        name: '',
        images: [],
        total: 0,
        index: 0,
        frameDelay: 0,
        fps: 0,
        classes: '',
        allowImages: ['true'],
        allowVideos: ['true'],
        maxImagesCheck: [],
        boxes: {},
        allowWeights: [],
        shortcut: {
          key: '',
          model: '',
          shortcuts: [{
            key: 'enter',
            model: 'Next image'
          }, {
            key: 'back',
            model: 'Previous image'
          }, {
            key: 'escape',
            model: ''
          }, {
            key: 'a',
            model: 'Outer road mark line'
          }, {
            key: 's',
            model: 'Center road mark line'
          }, {
            key: 'd',
            model: 'truck'
          }]
        },
      },
      creatingProject: false,
      editingProject: false,
      projectTable: {
        data: [],
        header: 'row',
        sort: [0, 1, 2, 3, 4, 5],
        border: true,
        stripe: true,
        enableSearch: true,
        pagination: true,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        highlight: { },
        highlightedColor: 'rgb(200, 235, 200)',
        columnWidth: [
          { column: 0, width: 40 },
          { column: 1, width: 150 },
          { column: 2, width: 90 },
          { column: 3, width: 90 },
          { column: 6, width: 85 }
        ]
      },

      projects: [

      ],
      selectedProject: null,
      drawerFlag: {
        state: 0,
        msg: ''
      },
      newProjectFlag: {
        state: 0,
        msg: ''
      }
    }
  },
  props: {

  },
  mounted () {
    this.$store.commit('resetLoading')
    this.getProjects()
  },
  computed: {

  },
// TODO
  //When changing image, press loading
  //Save when chagning image
  //Somehow boxes can get deleted, and all data is lost
  methods: {
      addShortcut () {
      if (this.newProject.shortcut.key === undefined || this.newProject.shortcut.key === '') {
        this.setFlag(2, 'Shortcut key is unset')
        return
      }
      if (this.newProject.shortcut.model === undefined || this.newProject.shortcut.model === '') {
        this.setFlag(2, 'Shortcut model is unset')
        return
      }
      this.newProject.shortcut.shortcuts.push({
        key: this.newProject.shortcut.key,
        model: this.newProject.shortcut.model
      })
    },
    isMarking (projectName) {
      let marking = false
      this.projects.forEach(project => {
        if (project[1] === projectName) {
          if (project[6] === 'true') marking = true
        }
      });
      console.log(marking)
      return false
    },
    deleteShortcut (shortcut) {
      this.newProject.shortcut.shortcuts.forEach((sc, index) => {
        if (sc.key === shortcut.key) {
          this.newProject.shortcut.shortcuts.splice(index, 1)
        }
      })
    },
    changeProject (index, data) {
      this.projectTable.highlight = { row: [index] }

      router.replace({
        query: { selectedProject: this.selectedProject }
      })

      this.selectedProject = data[1]
    },
    async getProjects () {
      try {
        this.projectTable.data = [['ID', 'Project name', 'Images', 'Boxes', 'Created', 'Modified', 'isMarking']]
        this.projects = (await drawerHandler.getProjects()).projects
        this.projects.forEach(project => {
          this.projectTable.data.push(project)
        });
      } catch (err) {
        log.error(err)
      }
    },
    loadProject () {

    router.push({
       name: 'drawer',
      query: { selectedProject: this.selectedProject }
    })
    },
    async downloadProject () {
      this.$store.commit('setLoading')
      //await drawerHandler.downloadProject(this.selectedProject)
      window.open(`https://api.itos.se/downloadProject?projectName=${this.selectedProject}`, "_blank")
      this.$store.commit('resetLoading')
    },
    async editProject () {
       this.$store.commit('setLoading')
       try {
           let newProject = await drawerHandler.loadProject(this.selectedProject)
           this.newProject.name = newProject.projectName
           this.newProject.shortcut = newProject.shortcut
           this.newProject.images = newProject.images
           this.newProject.created = newProject.created
           this.newProject.classes = newProject.classes
           this.newProject.boxes = newProject.boxes
           if (newProject.allowImages) this.newProject.allowImages = ['true']
           if (newProject.allowVideos) this.newProject.allowVideos = ['true']
           if (newProject.allowWeights) this.newProject.allowWeights = ['true']
           this.editingProject = true
           this.creatingProject = true
          this.$store.commit('resetLoading')
       } catch (err) {
          this.$store.commit('resetLoading')
       }
    },
    parseDate (date) {
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

      return (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
    },
    createNewProject () {
      try {
        this.resetNewProject()
        this.creatingProject = true
      } catch (err) {
        log.error(err)
      }
    },
    async createProject () {
      this.$store.commit('setLoading')
       this.setFlag(3, 'Creating new project', 0)
       try {
         if (this.newProject.name === '') {
           this.$store.commit('resetLoading')
           this.setFlag(2, 'Project name was undefined')
           return
         }

        if (!this.editingProject) {
           let nameExists = false
          this.projects.forEach(project => {
            if (project[1].toLowerCase() === this.newProject.name.toLowerCase()) {
              this.$store.commit('resetLoading')
                this.setFlag(2, 'Project name already exists')
                nameExists = true
              return
            }
          })
          if (nameExists) return
        }

        const allFiles = this.$refs['imagesInput'].files

         if (!this.editingProject) {

        if (allFiles.length === 0) {
            this.$store.commit('resetLoading')
            this.setFlag(2, 'No images/videos chosen.')
            return
          }
        }

        let formDataImage = new FormData();

        allFiles.forEach((file) => {
          let shouldAppend = false
          if (file.type.includes('image')) {
            if (this.newProject.allowImages[0] === 'true') {
              shouldAppend = true
            }
          } else if (file.type.includes('video')) {

              if (this.newProject.allowVideos[0] === 'true') {
              shouldAppend = true
            }
          }

          if (shouldAppend) {
            formDataImage.append('projectImages', file);
          }
        });

          let formDataWeight = new FormData();
          const weightInput = this.$refs['weightFile']
          let weightFiles = []
          if (weightInput) weightFiles = weightInput.files

          weightFiles.forEach((file) => {
          let shouldAppend = false
          if (file.name.includes('.weight')) {
            if (this.newProject.allowWeights[0] === 'true') {
              shouldAppend = true
            }
          }
          if (shouldAppend) {
            formDataWeight.append('projectWeight', file);
          }
        });


        await drawerHandler.uploadImages(this.newProject.name, formDataImage)

        if (this.newProject.allowWeights[0] === 'true') {
          console.log('uploadWeights')
          await drawerHandler.uploadWeights(this.newProject.name, formDataWeight)
        }

        this.setFlag(3, 'Files uploaded, creating project')

        if (this.newProject.created === undefined ||
          this.newProject.created === null) {
          this.newProject.created = this.parseDate(new Date())
        }

        const project = this.newProject

        project.allowImages = (this.newProject.allowImages[0] === 'true' ? true : false)
        project.allowVideos = (this.newProject.allowVideos[0] === 'true' ? true : false)
        project.customWeight = (this.newProject.allowWeights[0] === 'true' ? true : false)

        await drawerHandler.uploadNewProject(this.newProject)

        if (project.customWeight) {
          this.checkAutomaticMarking(project)
        } else {
          this.setFlag(1, 'Project created. Closing in 2 seconds')
          this.getProjects()
          setTimeout(() => {
            this.creatingProject = false
          }, 2000)
        }
      } catch (err) {
        this.$store.commit('resetLoading')
        if (err.response) {
          log.error(err.response.data)
          this.setFlag(2, err.response.data)
        } else {
          log.error(err)
          this.setFlag(2, err)
        }
      }

    },
    async checkAutomaticMarking (project) {
      this.setFlag(1, `Project created! The server is now running automatic detection. You can close this, the project will be disabled until automatic detection is done. Progress is updated: 0 out of X images processed`)

      try {
        await drawerHandler.startAutomaticMarking(project.name)
        const interval = setInterval(async () => {
           const respone = await drawerHandler.checkAutomaticMarking(project.name)
           if (respone.isDone === true) {
            clearInterval(interval)
            this.setFlag(1, 'Automatic marking done, closing in 2 secs')
            this.getProjects()
            setTimeout(() => {
              this.creatingProject = false
            }, 2000)
           } else {
              this.setFlag(1, `Project created! The server is now running automatic detection. You can close this, the project will be disabled until automatic detection is done. Progress is updated: ${respone.progress} out of ${respone.images} images processed`)
           }
        }, 1000)
      } catch (err) {
        log.error(err)
        this.setFlag(2, err)
      }

    },
    setFlag (state, msg) {
      this.newProjectFlag.state = state
      this.newProjectFlag.msg = msg
    },
    cancelProject () {
      this.creatingProject = false
      this.resetNewProject()
    },
    resetNewProject () {
       this.newProjectFlag = {
        state: 0,
        msg: ''
      }
      this.editingProject  = false
      this.newProject = {
        name: '',
        images: [],
        total: 0,
        index: 0,
        fps: 0,
        frameDelay: 0,
        classes: '',
        allowImages: ['true'],
        allowVideos: ['true'],
        allowWeights: [],
        maxImagesCheck: ['false'],
          shortcut: {
        key: '',
        model: '',
        shortcuts: [{
          key: 'enter',
          model: 'Next image'
        }, {
          key: 'back',
          model: 'Previous image'
        }, {
          key: 'escape',
          model: ''
        }, {
          key: 'a',
          model: 'Outer road mark line'
        }, {
          key: 's',
          model: 'Center road mark line'
        }, {
          key: 'd',
          model: 'truck'
        }]
      },
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
  max-height: 100%;
  width: 100%;
  object-fit: contain;
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
