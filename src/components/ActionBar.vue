<template lang="pug">
.action-bar
  slot
</template>

<script>
export default {
}
</script>

<style lang="scss">
.action-bar {
  margin-top: 16px;
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -8px;
  align-items: center;
  & > * {
    margin-right: 8px;
    margin-bottom: 8px;
  }
  & > span.text {
    display: block;
    font-family: 'Roboto Mono', sans-serif;
    .new-line {
      height: 6px;
    }
    a {
      color: inherit;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  & > .separator {
    width: 1px;
    height: 36px;
    margin-left: 4px;
    margin-right: 12px;
    background: #DDDDDD;
  }
}
</style>
