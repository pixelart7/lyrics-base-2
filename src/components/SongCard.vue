<template lang="pug">
a.song-card(v-if="isShowSelf", @click.prevent="navigate", :class="{'is-disabled': isDisabled}", :href="'#/lyrics/' + single.id + '/view'", :style="'background: linear-gradient(rgba(' + background + ',0.65), rgba(' + background + ',1.0))'")
  .lyrics-bg
    p {{single.lyrics[0].lyrics}}
  .information
    h2 {{singleSongObject.artist}}
    h1 {{singleSongObject.title}}
</template>

<script>
export default {
  data: () => ({
    isShowSelf: true,
    single: {
      id: '',
      title: '',
      artist: '',
      lyrics: [{ lyrics: '' }]
    },
    singleSongObject: {
      title: '',
      artist: ''
    },
    background: ''
  }),
  async created () {
    this.single = await this.$lyricsController.get.lyrics(this.id)
    this.singleSongObject = this.$lyricsController.utils.title.parse(this.single.title)
    this.background = this.$lyricsController.utils.artist.colorHash(this.singleSongObject.artist).bg
  },
  watch: {
    search (to, from) {
      if (this.search !== '') {
        if (this.singleSongObject.artist === this.search) {
          this.isShowSelf = true
        } else {
          this.isShowSelf = false
        }
      } else {
        this.isShowSelf = true
      }
    }
  },
  methods: {
    navigate () {
      if (!this.isDisabled) {
        this.$router.push({
          name: 'lyrics-viewer',
          params: {
            id: this.single.id
          }
        })
      }
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    search: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.song-card {
  display: inline-block;
  width: calc(50% - 12px);
  margin-right: 12px;
  margin-bottom: 12px;
  height: 128px;
  border-radius: 6px;
  padding: 12px;
  position: relative;
  text-decoration: none;
  & > .lyrics-bg {
    overflow: hidden;
    font-size: 12px;
    color: rgba(#FFFFFF, 0.05);
    height: 128px - 12px;
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
    h2 {
      font-size: 14px;
      color: rgba(#FFFFFF, 0.65);
      margin-bottom: 4px;
    }
    h1 {
      font-size: 20px;
      color: rgba(#FFFFFF, 0.95);
    }
  }
  &:hover {
    box-shadow: 0 0 8px 0 rgba(#000000, 0.25), 0 1px 1px 1px rgba(#000000, 0.15);
    opacity: 0.9;
  }
  &.is-disabled {
    cursor: default;
    box-shadow: none;
    &:hover {
      box-shadow: none;
      opacity: 1;
    }
  }
  @media only screen and (max-width: 316px) {
    width: 100%;
  }
  @media only screen and (min-width: 317px) {
    width: calc(50% - 12px);
  }
  @media only screen and (min-width: 585px) {
    width: calc(33.33% - 12px);
  }
  @media only screen and (min-width: 853px) {
    width: calc(25% - 12px);
  }
}
</style>
