import ElElements from 'vue-el-element'
import firebase from 'firebase/app'
import 'firebase/installations'
import 'firebase/auth'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import {
  faHeart,
  faComment,
  faCircle
} from '@fortawesome/free-regular-svg-icons'
import {
  faQuestionCircle,
  faTimes,
  faTimesCircle,
  faBars,
  faCheckCircle,
  faAngleDoubleDown,
  faCog,
  faExclamationTriangle,
  faThumbsUp,
  faThumbsDown,
  faCaretLeft,
  faCaretRight,
  faCaretUp,
  faCaretDown,
  faUserCircle,
  faUserCog,
  faKey,
  faDumbbell,
  faChartLine,
  faIdCard,
  faSignOutAlt,
  faCheck,
  faInfoCircle,
  faSpinner,
  faUserPlus,
  faUserEdit,
  faCreditCard,
  faPencilAlt,
  faArrowLeft,
  faFileDownload,
  faFileSignature

} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

let firebaseConfig = {
  apiKey: 'SECRET',
  authDomain: 'SECRET',
  databaseURL: 'SECRET',
  projectId: 'SECRET',
  storageBucket: 'SECRET',
  messagingSenderId: 'SECRET',
  appId: 'SECRET'
}

firebase.initializeApp(firebaseConfig)

global.firebase = firebase

library.add(faInstagram)
library.add(faHeart)
library.add(faComment)
library.add(faQuestionCircle)
library.add(faTimes)
library.add(faTimesCircle)
library.add(faBars)
library.add(faCheckCircle)
library.add(faCircle)
library.add(faAngleDoubleDown)
library.add(faCog)
library.add(faExclamationTriangle)
library.add(faThumbsUp)
library.add(faThumbsDown)
library.add(faCaretLeft)
library.add(faCaretRight)
library.add(faCaretUp)
library.add(faCaretDown)
library.add(faUserCog)
library.add(faUserCircle)
library.add(faKey)
library.add(faDumbbell)
library.add(faChartLine)
library.add(faIdCard)
library.add(faSignOutAlt)
library.add(faCheck)
library.add(faInfoCircle)
library.add(faSpinner)
library.add(faUserPlus)
library.add(faUserEdit)
library.add(faCreditCard)
library.add(faPencilAlt)
library.add(faArrowLeft)
library.add(faFileDownload)
library.add(faFileSignature)

export default (Vue) => {
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Object.entries(ElElements)
    .forEach(([type, ElElement]) => {
      Vue.component(type, ElElement)
    })
  return Vue
}
