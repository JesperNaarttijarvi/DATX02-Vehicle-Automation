<template>
<div>
  <div class="waitingscreen">
    <div class="frost"/>

    <div class="loader"
      v-bind:class="{
        green : success,
        red : danger
      }"
      />

    <div v-if="caption"
      class="caption">
      {{caption}}
    </div>
    <br>
    <br>
    <el-button
      v-if="close"
      type="danger"
      :center="true"
      @click="$emit('close')"
      >
      Stäng
    </el-button>
  </div>
</div>
</template>
<script>
export default {
  name: 'ElLoader',
  props: ['caption', 'success', 'danger', 'close']
}

</script>
<style scoped lang="less">
  @import '../styles/variables';

  .waitingscreen {
      height: 100%;
      width: 100%;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      z-index: 2;
    }

    .frost {
      height: 100%;
      width: 100%;
      background-color: @color-grey-dark;
      opacity: 0.9;
      z-index: 1;
    }

    .loader {
      border: 25px solid @color-brand;
      border-top: 25px solid @color-accent;
      border-radius: 50%;
      width: 140px;
      height: 140px;
      animation: spin 1.4s linear infinite;
      z-index: 2;
    }

    .caption {
      margin: 20px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      z-index: 2;
      background-color: @color-grey-dark;
      padding: 5px;
      border-radius: @radius-small;
    }
  }

  .green {
    border: 25px solid @color-success-light !important;
    border-top: 25px solid @color-success-dark !important;
  }

  .red {
    border: 25px solid @color-danger-light !important;
    border-top: 25px solid @color-danger-dark !important;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(120deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
