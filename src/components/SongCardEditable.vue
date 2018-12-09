<template lang="pug">
.song-card.is-disabled.is-editable(:style="'background: linear-gradient(rgba(' + background + ',0.65), rgba(' + background + ',1.0))'")
  .gradient-bg-overlay(:class="{'is-shown': isBgBlocked}")
  .information
    input.artist(v-model="artistModel", placeholder="ARTIST")
    textarea-autosize.title(v-model="titleModel", placeholder="TITLE")
</template>

<script>
const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

export default {
  data: () => ({
    initial: true,
    background: '',
    artistModel: '',
    titleModel: '',
    bgTransitionInterval: {},
    isBgBlocked: false
  }),
  created () {
    this.artistModel = this.artist
    this.titleModel = this.title
    this.initial = false
    this.bgUpdate()
  },
  watch: {
    title (to, from) {
      this.initial = true
      this.titleModel = this.title
      this.initial = false
    },
    async artist (to, from) {
      this.initial = true
      this.artistModel = this.artist
      await this.bgUpdate()
      this.initial = false
    },
    artistModel (to, from) {
      if (this.initial) return
      this.$emit('edit', 'artist', this.artistModel)
    },
    titleModel (to, from) {
      if (this.initial) return
      this.$emit('edit', 'title', this.titleModel)
    }
  },
  methods: {
    async bgUpdate () {
      this.isBgBlocked = true
      await waitFor(150)
      this.background = this.$lyricsController.utils.artist.colorHash(this.artistModel).bg
      clearTimeout(this.bgTransitionInterval)
      this.bgTransitionInterval = setTimeout(() => {
        this.isBgBlocked = false
        clearTimeout(this.bgTransitionInterval)
      }, 500)
    }
  },
  props: {
    artist: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.song-card.is-editable { 
  .gradient-bg-overlay {
    position: absolute;
    border-radius: 6px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(#444444, #333333);
    opacity: 0;
    transition: all 0.15s;
    &.is-shown {
      opacity: 1;
      transition: all 0.1s;
    }
  }
  .information {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    top: 6px;
    bottom: 6px;
    left: 6px;
    right: 6px;
  }
  input, textarea {
    margin: 0;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    width: 100%;
    background: none;
    border: 2px solid rgba(#FFFFFF, 0.4);
    border-radius: 6px;
    padding: 4px;
    &:hover {
      background: rgba(#FFFFFF, 0.1);
    }
  }
  input.artist {
    font-size: 14px;
    color: rgba(#FFFFFF, 0.65);
    margin-bottom: 4px;
  }
  textarea.title {
    // flex: 1;
    font-size: 20px;
    color: rgba(#FFFFFF, 0.95);
    resize: none;
  }
}
</style>
