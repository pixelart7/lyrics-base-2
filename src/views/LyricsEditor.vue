<template lang="pug">
.lyrics-editor
  .hero
    .inner
      SongCardEditable(:artist="rawData.artist", :title="rawData.title", @edit="updateSongCard")
  .content
    ActionBar
      ActionButton(@click="$router.go(-1)") ⬅ Discard
      template(v-if="status.isLoaded")
        ActionButton.is-primary(@click="save")
          | Save
          Loader(:class="{'is-shown': status.isSaving}")
        span.text(v-if="status.isDeletingConfirm") Delete?
        ActionButton.is-danger(v-if="$route.params.id !== 'new' && !status.isDeletingConfirm", @click="status.isDeletingConfirm = true") Delete
        ActionButton.is-danger(v-if="$route.params.id !== 'new' && status.isDeletingConfirm", @click="deleteLyrics") Confirm Delete
        ActionButton(v-if="$route.params.id !== 'new' && status.isDeletingConfirm", @click="status.isDeletingConfirm = false") Cancel
        .separator
        ActionButton(@click="removeReadings") Remove Readings
        ActionButton(@click="jpGenerateFurigana")
          | JP: Generate Furigana
          Loader(:class="{'is-shown': status.isGeneratingFurigana}")
    ActionBar(v-if="status.isLoaded").action-bar-small-screen
      ActionButton.language-control(@click="smallScreen.languageToggle = 'original'", :class="{'is-active': smallScreen.languageToggle === 'original'}") Original
      ActionButton.language-control(@click="smallScreen.languageToggle = 'translate'", :class="{'is-active': smallScreen.languageToggle === 'translate'}") Translate
      .separator.language-control
      ActionButton.preview-button(@click="smallScreen.isPreview = !smallScreen.isPreview", :class="{'is-active': smallScreen.isPreview}") Preview
    .columns
      .column.original(:class="{'is-shown': smallScreen.languageToggle === 'original'}")
        .section-header
          h1 ORIGINAL LYRICS
        textarea-autosize(v-model="rawData.lyrics.original", :min-height="420", placeholder="Original lyrics\nUse {word}(reading) to add reading annotation")
      .column.translate(:class="{'is-shown': smallScreen.languageToggle === 'translate'}")
        .section-header
          h1 TRANSLATED LYRICS
        textarea-autosize(v-model="rawData.lyrics.translate", :min-height="420", placeholder="Translated lyrics")
      .column.preview(:class="{'is-shown': smallScreen.isPreview}")
        .section-header
          h1 PREVIEW
        LyricsDisplay(:lyrics="rawData.lyrics", :isSmall="true")
</template>

<script>
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

import Loader from '@/components/Loader'
import ActionBar from '@/components/ActionBar'
import ActionButton from '@/components/ActionButton'
import SongCardEditable from '@/components/SongCardEditable'
import LyricsDisplay from '@/components/LyricsDisplay'
import { qualifiedTypeIdentifier } from 'babel-types';

const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

export default {
  data: () => ({
    status: {
      isLoaded: false,
      isGeneratingFurigana: false,
      isSaving: false,
      isDeletingConfirm: false
    },
    smallScreen: {
      languageToggle: 'original',
      isPreview: false
    },
    rawData: {
      artist: '',
      title: '',
      lyrics: {
        original: '',
        translate: ''
      }
    }
  }),
  async created () {
    if (this.$route.params.id !== 'new') {
      const single = await this.$lyricsController.get.lyrics(this.$route.params.id)
      const songObject = this.$lyricsController.utils.title.parse(single.title)
      this.rawData.artist = songObject.artist
      this.rawData.title = songObject.title
      this.rawData.lyrics.original = single.lyrics[0].lyrics
      this.rawData.lyrics.translate = single.lyrics[1].lyrics
    }
    this.status.isLoaded = true
  },
  methods: {
    updateSongCard (field, value) {
      this.rawData[field] = value
    },
    async save () {
      this.status.isSaving = true
      const lyrics = {
        title: this.$lyricsController.utils.title.stringify({ artist: this.rawData.artist, title: this.rawData.title }),
        tags: [],
        lyrics: [
          {
            lang: 'original',
            lyrics: this.rawData.lyrics.original
          },
          {
            lang: 'translate',
            lyrics: this.rawData.lyrics.translate
          }
        ]
      }
      if (this.$route.params.id === 'new') {
        await this.$lyricsController.add.lyrics(lyrics)
      } else {
        await this.$lyricsController.update.lyrics(this.$route.params.id, lyrics)
      }
      await waitFor(1000)
      this.status.isSaving = false
      if (this.$route.params.id !== 'new') {
        this.$router.push({
          name: 'lyrics-viewer',
          params: {
            id: this.$route.params.id
          }
        })
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    async deleteLyrics () {
      await this.$lyricsController.delete.lyrics(this.$route.params.id)
      this.$router.replace({
        name: 'home'
      })
    },
    removeReadings () {
      this.rawData.lyrics.original = this.rawData.lyrics.original.replace(/{{1}([^{}()]+)}{1}\({1}([^{}()]+)\){1}/gm, '$1');
    },
    async jpGenerateFurigana () {
      this.status.isGeneratingFurigana = true
      const kuroshiro = new Kuroshiro()
      await kuroshiro.init(new KuromojiAnalyzer({ dictPath: '/dict/' }))

      this.removeReadings()
      let result = await kuroshiro.convert(this.rawData.lyrics.original, {
        mode: 'furigana',
        to: 'hiragana'
      })
      result = result.replace(/<ruby>/gm, '{')
        .replace(/<rp>\(<\/rp><rt>/gm, '}(')
        .replace(/<\/rt><rp>\)<\/rp><\/ruby>/gm, ')')
      this.rawData.lyrics.original = result
      this.status.isGeneratingFurigana = false
    }
  },
  components: {
    Loader,
    ActionBar,
    ActionButton,
    SongCardEditable,
    LyricsDisplay
  }
}
</script>

<style lang="scss">
.lyrics-editor {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 36px;
  & > .hero {
    width: 100%;
    height: 96px;
    background: #EFEFEF;
    display: flex;
    justify-content: flex-start;
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
    // max-width: 1120px;
    background: #FFFFFF;
    padding-top: 48px + 16px;
    & > .action-bar {
      &.action-bar-small-screen {
        display: none;
      }
      .preview-button, .language-control {
        display: none;
      }
    }
    & > .columns {
      display: flex;
      & > .column {
        flex: 1;
        textarea {
          margin: 0 24px;
          padding: 12px;
          width: calc(100% - 24px - 24px);
          border: 2px solid rgba(#000000, 0.15);
          border-radius: 6px;
          line-height: 26px;
        }
        .lyrics-display {
          padding: 0 24px;
        }
      }
    }
    & > .columns > .column > .section-header {
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
  @media only screen and (max-width: 584px) {
    & > .content > .columns > .column.original, & > .content > .columns > .column.translate {
      display: none;
      &.is-shown {
        display: block;
      }
    }
    & > .content > .action-bar .language-control {
      display: block;
    }
  }
  @media only screen and (max-width: 852px) {
    & > .content > .action-bar.action-bar-small-screen {
      display: flex;
    }
    & > .content > .columns > .column.preview {
      display: none;
      &.is-shown {
        display: block;
      }
    }
    & > .content > .action-bar .preview-button {
      display: block;
    }
  }
}
</style>
