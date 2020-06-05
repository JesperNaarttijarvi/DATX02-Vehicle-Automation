<template>
  <transition name="fade">
    <div id="toast" :class="{ success, warning, danger }">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    success: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/variables';
/* The snackbar - position it at the bottom and in the middle of the screen */
.success {
  background: @color-confirm !important;
}
.warning {
  background: @color-warning-medium !important;
}
.danger {
  background: @color-error-medium!important;
}
#toast {
  visibility: visible; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: @radius-small;
  padding: 16px;
  position: fixed;
  z-index: 100;
  align-self: center;
  top: 30px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
