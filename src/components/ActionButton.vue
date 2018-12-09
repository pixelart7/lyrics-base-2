<template lang="pug">
.action-button
  button(@click="$emit('click')"): slot
</template>

<script>
export default {
}
</script>

<style lang="scss">
.action-button {
  & > button {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 6px;
    border: 2px solid #666666;
    height: 36px;
    background: #FFFFFF;
    font-family: 'Roboto Mono', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #111111;
    cursor: pointer;
    &:hover {
      background: #FEFEFE;
      opacity: 0.95;
      box-shadow: 0 0 8px 0 rgba(#000000, 0.25), 0 1px 1px 1px rgba(#000000, 0.15);
    }
  }
  &.is-active > button {
    background: #444444;
    color: #FFFFFF;
    &:hover {
      background: #555555;
    }
  }
  &.is-primary > button {
    border-color: #0078D7;
    color: darken(#0078D7, 15);
    .loader .lds-ring div {
      border-color: #0078D7 transparent transparent transparent;
    }
  }
  &.is-danger > button {
    border-color: rgb(175, 14, 28);
    color: darken(rgb(175, 14, 28), 10);
  }
}
</style>
