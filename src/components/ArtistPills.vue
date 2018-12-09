<template lang="pug">
.artist-pills
  Pill(v-for="(l, i) in list", @click="pillClick(l, i)", :text="l", :background="colorHash(l).bg", :isActive="activeIndex === i || activeIndex === -1")
</template>

<script>
import Pill from '@/components/Pill'

export default {
  methods: {
    colorHash (text) {
      return this.$lyricsController.utils.artist.colorHash(text)
    },
    pillClick (l, i) {
      this.$emit('updated', i)
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: -1
    }
  },
  components: {
    Pill
  }
}
</script>

<style lang="scss">
.artist-pills {
  margin-bottom: -8px;
  margin-right: -8px;
  & > .pill {
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
