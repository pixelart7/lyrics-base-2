<template lang="pug">
.logo
  span.lyrics LYRICS
  span.dot .
  span.base BASE
</template>

<script>
export default {
}
</script>

<style lang="scss">
.logo {
  padding: 8px 12px;
  background: #484848;
  border-radius: 6px;
  height: 44px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  & > span {
    font-family: 'Roboto Mono', monospace;
    color: #FFFFFF;
    font-size: 24px;
    &.lyrics {
      color: #00CDFF;
    }
  }
}
</style>
