import Vue from 'vue'
// Global components
import global from './global'
import App from './App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'
import dev from './dev'

Vue.config.productionTip = false

// Vue.use(VueFire)

global(Vue)
let app = ''

const initApp = () => {
  app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

if (!dev.firebase) {
  initApp()
} else {
  // eslint-disable-next-line
  firebase.auth().onAuthStateChanged(() => {
    if (!app) {
      initApp()
    }
  })
}
