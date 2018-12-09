<template lang="pug">
.lyrics-display(:class="{'is-small': isSmall}")
  template(v-for="i in Math.max(lyricsParsed.original.length, lyricsParsed.translate.length)")
    template(v-if="(i-1) < lyricsParsed.original.length"): p.lyrics-line.original(v-html="parseRuby(lyricsParsed.original[(i-1)])")
    p.lyrics-line.translate(v-if="(i-1) < lyricsParsed.translate.length")  {{lyricsParsed.translate[(i-1)]}}
</template>

<script>
export default {
  data: () => ({
    lyricsParsed: {
      original: [],
      translate: []
    }
  }),
  created () {
    this.updateData()
  },
  watch: {
    lyrics: {
      handler (to, from) {
        this.updateData()
      },
      deep: true
    }
  },
  methods: {
    updateData () {
      this.lyricsParsed.original = []
      this.lyricsParsed.translate = []
      this.lyrics.original.split(/\n/).forEach((elm) => this.lyricsParsed.original.push(elm))
      this.lyrics.translate.split(/\n/).forEach((elm) => this.lyricsParsed.translate.push(elm))
    },
    parseRuby (text) {
      return this.$lyricsController.utils.lyrics.parseRuby(text)
    }
  },
  props: {
    lyrics: {
      type: Object,
      default: () => ({
        original: '',
        translate: ''
      })
    },
    isSmall: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.lyrics-display {
  p.lyrics-line {
    margin: 0;
    padding: 0 12px;
  }
  p.original {
    font-size: 20px;
    min-height: 12px;
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }
  p.translate {
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #AAAAAA;
    margin-bottom: 16px;
    margin-top: 4px;
  }
  &.is-small {
    p.original {
      font-size: 16px;
      min-height: 2px;
    }
    p.translate {
      font-size: 12px;
    }
  }
}
</style>
