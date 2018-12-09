<template lang="pug">
a.song-card.new-song-card(href="#/lyrics/new/edit", @click.prevent="navigate")
  .information
    h1 +
</template>

<script>
export default {
  methods: {
    navigate () {
      this.$router.push({
        name: 'lyrics-editor',
        params: {
          id: 'new'
        }
      })
    }
  }
}
</script>

<style lang="scss">
.new-song-card {
  border: 2px dashed #00CDFF;
  display: inline-block;
  margin-bottom: 0; // TODO: BUG?
  position: relative;
  @media only screen and (max-width: 316px) {
    margin-bottom: 12px;
  }
  & > .information {
    position: absolute;
    bottom: 12px;
    left: 12px;
    right: 12px;
    h1, h2 {
      margin: 0;
      font-family: 'M PLUS Rounded 1c', sans-serif;
      width: 100%;
    }
    h1 {
      font-size: 20px;
      color: rgba(darken(#00CDFF, 5), 0.95);
    }
  }
}
</style>
