<template>
  <div id="app">
    <router-view />
    <spinner v-if="isLoading" />
     <login-modal :show="showLoginModal" />
    <transition name="slide">
      <toast
        v-if="toast"
        :success="toast.state === 1"
        :error="toast.state === 2"
        :danger="toast.state === 3"
      >{{toast.msg}}</toast>
    </transition>
  </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue'
import Spinner from './components/Spinner'
import Toast from './components/Toast'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    LoginModal,
    Spinner,
    Toast
  },
  computed: mapGetters(['isLoading', 'flags', 'showLoginModal']),
  mounted () {
    console.log('drawer yao')
  },
  data () {
    return {
      toast: null
    }
  },
  created () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      let w = window.innerWidth
      let device = 'xs'
      if (w > 767) device = 'sm'
      if (w > 1023) device = 'md'
      if (w > 1199) device = 'lg'
      this.$store.commit('setDevice', device)
    }
  }

}
</script>

<style lang="less">
@import './styles/variables';
html {
  scroll-behavior: smooth;
}
html,
body {
  height: 100%;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
#app {
  background: @color-grey-light;
  font-family: @font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow-x: hidden;
}
hr {
  border: none;
  border-top: 1px solid @color-grey-light;
  margin-bottom: 18px;
}

.card {
  position: relative;
  background: white;
  box-shadow: @shadow;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 20px 10px;
  width: 95%;
  margin: auto;
  bottom: 10px;
  transition: height 1s ease;
  max-width: 500px;

img  {
    max-width:100%;
max-height:100%;
  }
}
@media screen and (min-width: @sm-min-width) {
  .card {
  padding: 30px;
  }
}
header {
  margin-top: 18px;
    h1,
    h2,
    h3,
    h4 {
      margin-bottom: 5px;
    }
    margin-bottom: 35px;
    p {
      font-size: @font-size-small;
    }
  }

.content-wrapper {
  display: flex;
  flex:1;
  transition: height 1s ease;
  overflow-y: scroll;
  padding: 0 5%;
  width: 100%;
}

.container {
  background: @color-grey-light;
 /* background-image: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0.65) 20%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    url('./assets/eleiko4.png') !important; */
  background-size: cover;
  flex: 1;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .again-button {
    border: none;
    background: @color-secondary;
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    border-radius: @radius-small;
    box-shadow: @shadow;
    width: 300px;
    height: 100px;
    font-size: 32px;
    margin: 0 auto;
    cursor: pointer;
    svg {
      margin-right: 10px;
    }
  }
  nav {
    display: grid;
    grid-template-columns: calc(50% - 20px) calc(50% - 20px);
    grid-gap: 40px;
    width: 1200px;
    height: 800px;
    a {
      background-image: linear-gradient(
        to bottom right,
        white 40%,
        rgb(231, 231, 231)
      );
      font-size: 32px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: @radius-small;
      border-bottom: 8px solid;
      border-color: transparent;
      color: @color-grey-dark;
      svg {
        font-size: 100px;
        margin-bottom: 28px;
      }
    }
    a:hover {
      background: white;
      box-shadow: @shadow;
    }
    a:first-child {
      border-color: @color-secondary;
      svg {
        color: @color-secondary;
      }
    }
    a:nth-child(2) {
      border-color: @color-orange;
      svg {
        color: @color-orange;
      }
    }
    a:nth-child(3) {
      border-color: @color-green;
      svg {
        color: @color-green;
      }
    }
    a:last-child {
      border-color: @color-primary;
      svg {
        color: @color-primary;
      }
    }
  }

  footer {
    margin-top: 15px;
    font-style: italic;
    background-color: @color-grey-lightest;
    padding: 10px;
  }
  hgroup {
    background: @color-grey-lightest;
    padding: 20px 0 10px;
  }
  textarea {
    height: 200px;
    margin-bottom: 15px;
    resize: none;
  }
  .alt-link {
    color: @color-secondary;
  }
}

/*
   animation
*/
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s;
  opacity: 1;
}

/*
   before transition start
*/
.slide-enter,
.slide-leave-to {
  margin-top: -50px;
  opacity: 0;
}

/*
   at end transition
*/
.slide-enter-to,
.slide-leave {
  margin-top: 0px;
}
</style>
