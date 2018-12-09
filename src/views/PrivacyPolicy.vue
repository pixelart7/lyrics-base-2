<template lang="pug">
.home-page
  .hero
    .inner
      Logo
  .content
    ActionBar
      ActionButton(@click="$router.push({ name: 'home' })") ⬅ Back Home
    .text
      h1 Privacy Policy
      p Chaiyapat Tantiworachot built the Lyrics Base web application as an Open Source app. The source code of this application is accessible at
        | 
        a(href="https://www.github.com/pixelart7/lyrics-base-2") https://www.github.com/pixelart7/lyrics-base-2
        |. This SERVICE is provided by Chaiyapat Tantiworachot at no cost and is intended for use as is.
      p I do not collect any information. This SERVICE runs and processes on your local browser and all data are accessible only by you. Some application data is uploaded and stored to your Google Drive, a third-party service provided by Google.
      p For easier access to Google's privacy policy:
        | 
        a(href="https://policies.google.com/privacy", target="_blank") https://policies.google.com/privacy
</template>

<script>
import Logo from '@/components/Logo'
import ActionBar from '@/components/ActionBar'
import ActionButton from '@/components/ActionButton'

export default {
  components: {
    Logo,
    ActionBar,
    ActionButton
  }
}
</script>

<style lang="scss">
.home-page > .content {
  padding: 24px 0;
  & > .text {
    padding: 12px 36px;
    h1 {
      font-family: 'Roboto Mono', monospace;
      font-size: 24px;
    }
    p {
      line-height: 26px;
    }
  }
}
</style>
