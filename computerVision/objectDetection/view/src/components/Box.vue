<template>
    <div class="box-wrapper"  @click="next">
        <div class="box"
        :style="{top: top + 'px', left: left + 'px', width: width + 'px', height: height + 'px', border: '2px solid ' + color}">
        <p class="noselect label">{{label}}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    'top': {
      required: true
    },
    'left': {
      required: true
    },
    'width': {
      required: true
    },
    'height': {
      required: true
    },
    'label': {
      required: true,
      type: String
    },
    'color': {
      required: false,
      type: String,
      default: '#90ee90'
    }
  },
  methods: {
    next () {
      if (this.disabled === true) return

      this.$emit('click')

      setTimeout(() => {
        if (this.$el && this.$el.blur) {
          this.$el.blur()
        }
      }, 400)
    }
  }
}
</script>

<style scoped lang="less">
  .box {
      position: absolute;
      &:hover, &.active {
          background-color: rgba(196, 97, 40, 0.2);
      }

      z-index: 3;
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

  .label {
    font-size: 12px;
    color: cyan;
  }
</style>
