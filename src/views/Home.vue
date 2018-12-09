<template lang="pug">
.home-page
  .hero
    .inner
      Logo
      .pusher
      RemoteStorageControl
  .content
    //- .section-header
    //-   h1 RECENTS
    .section-header
      h1 ARTISTS
      ArtistPills(@updated="artistUpdate", :list="artists", :activeIndex="activeIndex")
    .section-header
      h1 ALL {{byText}}
      SongCards(:list="allLyricsId", :search="searchString")
</template>

<script>
import Logo from '@/components/Logo'
import RemoteStorageControl from '@/components/RemoteStorageControl'
import ArtistPills from '@/components/ArtistPills'
import SongCards from '@/components/SongCards'

export default {
  data: () => ({
    artists: [],
    allLyricsId: [],
    activeIndex: -1,
    searchString: '',
    byText: '',
    loadDataInterval: {},
    isSyncDone: false,
    syncTries: 0
  }),
  async created () {
    this.$rs.on('sync-done', () => {
      setTimeout( () => {
        this.updateData()
        this.isSyncDone = true
      }, 500)
    })
    this.loadDataInterval = setInterval(() => {
      if (this.isSyncDone) {
        if (this.artists.length === 0 && this.syncTries < 10) this.updateData()
        else clearInterval(this.loadDataInterval)
        this.syncTries = this.syncTries + 1
      }
    }, 2000)
    await this.updateData()
  },
  beforeDestroy () {
    clearInterval(this.loadDataInterval)
  },
  methods: {
    async updateData () {
      this.artists = (await this.$lyricsController.get.allArtists()).sort()
      this.allLyricsId = Object.keys(await this.$lyricsController.get.allLyrics())
    },
    artistUpdate (i) {
      if (i === this.activeIndex) {
        this.activeIndex = -1
        this.searchString = ''
        this.byText = ''
      } else {
        this.activeIndex = i
        this.searchString = this.artists[i]
        this.byText = `BY ${this.artists[i]}`
      }
    }
  },
  components: {
    Logo,
    RemoteStorageControl,
    ArtistPills,
    SongCards
  }
}
</script>

<style lang="scss">
.home-page {
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
      & > .remote-storage-control {
        height: 57px;
      }
      @media only screen and (max-width: 525px) {
        flex-direction: column-reverse;
        align-items: flex-start;
        & > .pusher {
          display: none;
        }
        & > .remote-storage-control {
          margin-left: 0;
          .rs-closed {
            background: rgba(#FFFFFF, 0) !important;
          }
        }
      }
    }
  }
  & > .content {
    width: 100%;
    max-width: 1120px;
    background: #FFFFFF;
    padding-top: 22px;
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
      }
    }
  }
}
</style>
