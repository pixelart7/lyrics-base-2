<template lang="pug">
.loader
  .lds-ring
    div
    div
    div
    div
</template>

<script>
export default {
}
</script>

<style lang="scss">
.loader {
  display: inline-block;
  position: relative;
  width: 0px;
  overflow: hidden;
  height: 24px;
  .lds-ring {
    display: inline-block;
    position: relative;
    top: -2px;
    width: 16px;
    height: 16px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 6px;
    border: 2px solid #222222;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #222222 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  &.is-shown {
    width: 28px;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
