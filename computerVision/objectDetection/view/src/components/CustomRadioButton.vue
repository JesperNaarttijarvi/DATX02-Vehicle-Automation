<template>
  <div class="radiobutton-container" :class="{ disabled, row, center }">
    <label
      v-for="(value, index) in options"
      class="radiobutton"
      :class="{ secondary }"
      :key="index"
    >
      <div v-if="html" v-html="value" />
      <div v-else>{{ value }}</div>
      <input
        type="radio"
        :id="index"
        :value="value"
        v-model="picked"
        @click="onChange()"
      />
      <span class="mark" :value="value" />
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      picked: null // values are indices, default is first elem of list
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    secondary: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    html: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true
    },
    row: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.picked = this.value
  },
  methods: {
    onChange () {
      if (this.disabled) return
      setTimeout(() => {
        console.log(this.picked)
        this.$emit('click', this.picked)
      }, 0)
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/variables';
.radiobutton-container {
  margin: 8px 0 18px 0;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.row {
  display: flex;
  justify-content: space-around;
}

.center {
  label {
    align-self: center;
  }
}
.radiobutton {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 38px;
  margin-bottom: 12px !important;
  height: 25px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: auto !important;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .mark:after {
    content: '';
    position: absolute;
    display: none;
    top: 8px;
    left: 8px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: white;
  }
  .mark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
  }
}

.radiobutton:hover input ~ .mark {
  border: 1px solid @color-primary-light;
}

.radiobutton input:checked ~ .mark {
  background-color: @color-primary;
  border: 1px solid @color-primary-light;
}

.radiobutton input:checked ~ .mark:after {
  display: block;
}

.secondary input:checked ~ .mark {
  background-color: @color-secondary;
  border: 1px solid @color-secondary;
}

.secondary input:checked ~ .mark {
  border: 1px solid @color-secondary;
}

.disabled,
.disabled:hover {
  opacity: 0.5;
}
</style>
