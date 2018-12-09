<template lang="pug">
.lyrics-viewer
  .hero
    .inner
      SongCard(:id="this.$route.params.id", :isDisabled="true")
  .content
    ActionBar
      ActionButton(@click="$router.push({ name: 'home' })") ⬅ All
      ActionButton.is-primary(v-if="status.isLoaded", @click="$router.push({ name: 'lyrics-editor', params: { id: $route.params.id } })") Edit
    .section-header
      h1 LYRICS
      LyricsDisplay(:lyrics="lyrics")
</template>

<script>
import ActionBar from '@/components/ActionBar'
import ActionButton from '@/components/ActionButton'
import Logo from '@/components/Logo'
import SongCard from '@/components/SongCard'
import LyricsDisplay from '@/components/LyricsDisplay'

export default {
  data: () => ({
    status: {
      isLoaded: false
    },
    lyrics: {
      original: '',
      translate: ''
    }
  }),
  async created () {
    const single = await this.$lyricsController.get.lyrics(this.$route.params.id)
    this.lyrics.original = single.lyrics[0].lyrics
    this.lyrics.translate = single.lyrics[1].lyrics
    this.status.isLoaded = true
  },
  components: {
    ActionBar,
    ActionButton,
    Logo,
    SongCard,
    LyricsDisplay
  }
}
</script>

<style lang="scss">
.lyrics-viewer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > .hero {
    width: 100%;
    height: 96px;
    background: #EFEFEF;
    display: flex;
    justify-content: center;
    position: relative;
    background-image: linear-gradient(-180deg, #FFFFFF 0%, #EEEEEE 100%);
    & > .inner {
      position: absolute;
      bottom: -22px;
      width: 100%;
      display: flex;
      align-items: center;
      height: 48px;
      max-width: 1120px;
      padding: 0 24px;
      & > .pusher {
        flex: 1;
      }
    }
  }
  & > .content {
    width: 100%;
    max-width: 1120px;
    background: #FFFFFF;
    padding-top: 48px + 16px;
    & > .section-header {
      margin-top: 36px;
      margin-bottom: 14px;
      // padding: 0 (24px+12px);
      padding: 0 24px;
      & > h1 {
        font-size: 18px;
        font-family: 'Roboto Mono', monospace;
        color: #484848;
        padding: 0 12px;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
