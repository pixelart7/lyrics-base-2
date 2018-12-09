<template lang="pug">
#app
  router-view
  .footer
    .inner
      ActionBar
        span.text
          | Made with ❤️ and ☕️ by
          |
          a(href="https://github.com/pixelart7") Chaiyapat Tantiworachot
          .new-line
          | Zero information are collected. All your data belong to you, stored on your browser and your Google Drive
          |
          router-link(:to="{name: 'privacy-policy'}") Privacy Policy
      ActionBar
        a.link-wrap(href="https://github.com/pixelart7/lyrics-base-2"): ActionButton View on GitHub
</template>

<script>
import ActionBar from '@/components/ActionBar'
import ActionButton from '@/components/ActionButton'

export default {
  components: {
    ActionBar,
    ActionButton
  }
}
</script>

<style lang="scss">
@import '~sanitize.css';
@import url('https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c|Roboto+Mono:400,700&subset=japanese');

* {
  transition: all 0.25s;
}

#app {
  display: flex;
  align-items: center;
  flex-direction: column;
  .footer {
    // margin-top: 36px;
    background-image: linear-gradient(to top, #FFFFFF 0%, #EEEEEE 100%);
    width: 100%;
    padding-top: 24px;
    padding-bottom: 24px + 16px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .inner {
      width: 100%;
      max-width: 1120px;
      .action-bar {
        .text {
          font-size: 12px;
          line-height: 14px;
        }
        a.link-wrap {
          text-decoration: none;
        }
      }
    }
  }
}

button:focus, input:focus, textarea:focus {
  outline:none;
}
</style>
