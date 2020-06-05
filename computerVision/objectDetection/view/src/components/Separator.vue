<template>
    <div v-if="text" class="separator" :class="{noMargin}">{{ text }}</div>
    <div v-else class="separatorNoText" :class="{noMargin}" :style="{ backgroundColor, width, height }"></div>
</template>

<script>
export default {
  props: {
    text: String,
    noMargin: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false
    },
    backgroundColor: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/variables';
.separatorNoText, .separator {
  margin-bottom: 18px;
}
.separator {
  display: flex;
  flex-basis: 100%;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  width: 100%;
}
.separator:before,
.separator:after,
.separatorNoText {
  box-sizing: border-box;
  content: '';
  height: 1px;
  background: rgba(0,0,0,0.3);
}
.separator:after {
  margin-left: 10px;
}
.separator:before {
  margin-right: 10px;
}
</style>
