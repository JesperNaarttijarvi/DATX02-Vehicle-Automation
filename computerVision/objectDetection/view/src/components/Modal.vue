<template>
  <transition name="modal">
    <div class="modal-mask" @click="close" v-show="show">
      <div class="modal-container" :class="{morePadding}" @click.stop>
        <div v-if="!userCannotClose" class="close-x" @click="close"></div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userCannotClose: {
      type: Boolean,
      default: false
    },
    morePadding: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close: function () {
      this.$emit('close')
    }
  },
  mounted: function () {
    if (this.userCannotClose) return
    document.addEventListener('keydown', e => {
      if (this.show && e.keyCode === 27) {
        this.close()
      }
    })
  },
  updated: function () {
    document.documentElement.style.overflowY = this.show ? 'hidden' : 'scroll'
  }
}
</script>

<style lang="less" scoped>
@import '../styles/variables';
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-container {
  position: relative;
  width: 93%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: @radius-small;
  max-width: 340px;
}

.morePadding {
  padding: 40px 20px !important;
}

.close-x {
  color: white;
  position: absolute;
  top: -60px;
  right: 2px;
  font-size: 50px;
}
.close-x:hover {
  cursor: pointer;
}
.close-x:after {
  content: '\00d7'; /* This will render the 'X' */
}

</style>
