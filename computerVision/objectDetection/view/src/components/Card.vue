<template>
  <div class="npc-card"
   v-bind:class="{
        center
      }"
     >
    <img
      v-if="image"
       :class="{
        portrait
      }"
      :src="notAsset ? image : require('../assets/' + image)"
      :style="{order: right ? 1 : 0}"
    />
    <iframe
      v-if="iframe"
      :class="{noText}"
      allowfullscreen
      class="iframe"
      :src="iframe"
      :style="{order: right ? 1 : 0}"
    ></iframe>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      required: false,
      type: String
    },
    src: {
      required: false,
      type: String
    },
    small: {
      type: Boolean,
      default: false
    },
    right: {
      required: false,
      type: Boolean
    },
    iframe: {
      required: false,
      type: String
    },
    noText: {
      type: Boolean,
      default: false
    },
    notAsset: {
      type: Boolean,
      default: false
    },
    portrait: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
@import '../styles/variables';
.npc-card {
  margin: 0px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
  justify-content: center;
  height: 50%;
  box-shadow: @shadow;
  border: 2px solid white;
  border-radius: @radius-small;
  width: calc(100% - 20px);
  transition: 1s;
}
.center {
  width: initial;
}
.small {
  max-height: 750px;
}
section {
  background: white;
  padding: 6vmin 8vmin;
  justify-content: center;
  flex: 1;
}

@media screen and (max-width: @xs-max-width) {
  img,
  .iframe {
    margin: 0 !important;
    order: 0 !important;
    max-height: 450px;
    min-height: 300px;
    width: 100% !important;
  }
  section {
    width: 100%;
  }
}

@media screen and (min-width: @lg-min-width) {
  .iframe {
    min-height: 500px;
  }
}

img,
.iframe {
  height: auto;
  width: 50%;
  object-fit: cover;
  border: none;
  border: 2px solid white;
}

@media (min-width: @sm-min-width) {
  .portrait {
    width: 20% !important;
  }
}

.noText {
  width: 100% !important;
  min-height: 700px;
}
@media screen and (max-width: @xs-max-width) {
  .noText {
    min-height: 400px;
  }
}
h3 {
  text-transform: uppercase;
}
</style>
