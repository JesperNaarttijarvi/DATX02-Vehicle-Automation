<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    type="button"
    :class="{
      primary,
      primaryBorder,
      disabled,
      confirm,
      back,
      marginRight,
      facebook,
      marginTop,
      secondary,
      secondaryBorder,
      dark,
      alignLeft,
      alignRight,
      bigger
      }"
    @click="next"
  >
    <slot/>
  </component>
</template>

<script>
export default {
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    primaryBorder: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    secondaryBorder: {
      type: Boolean,
      default: false
    },
    bigger: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: false
    },
    back: {
      type: Boolean,
      default: false
    },
    facebook: {
      type: Boolean,
      default: false
    },
    alignLeft: {
      type: Boolean,
      default: false
    },
    alignRight: {
      type: Boolean,
      default: false
    },
    marginRight: {
      type: Boolean,
      default: false
    },
    marginTop: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      required: false
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
@import '../styles/variables';
button,
a {
  font-family: inherit;
  background: transparent;
  padding: @button-padding;
  border: none;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  font-size: @font-size-xs-small;
  border-radius: @button-radius;
  margin-bottom: @margin-normal;
  display: inline-block;
  transition: .3s;
  font-size: @font-size-xs-small !important;
}
a:hover, button:hover {
  filter: brightness(1.1);
  text-decoration: none !important;
}
.disabled, .disabled:hover {
  opacity: 0.5;
}
.primary, .secondary, .confirm, .back, .facebook, .dark {
  color: white !important;
}
.primary {
  background: @color-primary;
}
.primaryBorder {
  border: 2px solid white;
  color: @color-primary;
}
.primaryBorder:hover {
  color: @color-primary;
  border-color: @color-primary;
}
.secondary {
  background: @color-secondary;
}
.secondaryBorder {
  border: 2px solid @color-secondary;
  color: @color-secondary;
}
.secondaryBorder:hover {
  background: @color-secondary;
  color: white;
}
.dark {
  background: @color-grey-darkest;
}
.dark:hover {
  background: @color-grey-light;
  box-shadow:inset 0px 0px 0px 2px @color-grey-darkest;
  color: @color-grey-darkest !important;
}
.confirm {
  background:  @color-confirm-medium;
}
.back {
  background: @color-grey-medium;
  color: white !important;
}
.facebook {
  background: @color-facebook;
}
.alignLeft {
  align-self:flex-start;
}
.bigger {
  font-size: @font-size-small !important;
}
</style>
