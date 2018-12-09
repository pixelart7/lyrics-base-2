<template lang="pug">
.pill
  button(@click="$emit('click')", :class="{'is-active': isActive}", :style="'background: linear-gradient(rgba(' + background + ',0.65), rgba(' + background + ',1.0));'") {{text}}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: '244,244,244'
    }
  }
}
</script>

<style lang="scss">
.pill {
  & > button {
    padding: 4px 12px;
    border-radius: 6px;
    border: 0px;
    height: 36px;
    background: #EFEFEF;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    color: rgba(255, 255, 255, 0.95);
    opacity: 0.3;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
      box-shadow: 0 0 8px 0 rgba(#000000, 0.25), 0 1px 1px 1px rgba(#000000, 0.15);
    }
    &.is-active {
      opacity: 1;
      &:hover {
        opacity: 0.95;
      }
    }
  }
}
</style>
