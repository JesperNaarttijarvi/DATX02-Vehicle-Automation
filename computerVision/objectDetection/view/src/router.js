import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Drawer from './views/Drawer.vue'
import store from './store'


Vue.use(Router)

let toNext = ''
// TODO: Not sure crawlers see these titles

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Project selector',
        requiresAuth: true
      }
    },
    {
      path: '/drawer',
      name: 'drawer',
      component: Drawer,
      props: (route) => ({
        selectedProject: route.query.selectedProject,
      }),
      meta: {
        title: 'Drawer',
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title =
    `${to.meta.title ? to.meta.title + ' | ' : ''}` +
    'Kandidatarbete 2020'
  // eslint-disable-next-line
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    toNext = to
    store.commit('openLoginModal')
    next(false)
    return
    // eslint-disable-next-line brace-style
  } else if (toNext !== '') {
    let toNextCopy = toNext
    toNext = ''
    next(toNextCopy)
  }
  next()
})

export default router
