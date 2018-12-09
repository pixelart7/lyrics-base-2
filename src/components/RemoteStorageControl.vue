<template lang="pug">
.remote-storage-control
  #remotestorage-widget
</template>

<script>
import Widget from 'remotestorage-widget'

export default {
  created () {
  },
  mounted () {
    const widget = new Widget(this.$rs)
    widget.attach('remotestorage-widget')
  },
  methods: {
  }
}
</script>

<style lang="scss">
.remote-storage-control {
  align-self: flex-start;
  margin-left: 8px;
  #remotestorage-widget {
    position: relative;
    top: -3px;
    .rs-widget {
      box-shadow: none;
      margin: 0;
      max-width: 280px;
      border-radius: 6px;
      background-color: darken(#484848, 5);
      &.rs-closed {
        background: #FFFFFF;
        max-width: 56px;
        opacity: 1;
        border-bottom: 1px solid rgba(#000000, 0.0);
        transition: all 0.25s;
        .rs-button {
          opacity: 0;
        }
        &:hover {
          border-color: rgba(#000000, 0.2)
        }
      }
      .rs-box {
        h3 {
          color: #FFFFFF;
        }
      }
      .rs-content * {
        color: #FFFFFF;
      }
      .rs-big-headline {
        font-size: 18px;
        font-weight: 700;
      }
      .rs-small-headline {
        font-size: 14px;
      }
      .rs-short-desc {
        color: rgba(#FFFFFF, 0.75);
      }
      .rs-connected-text {
        h1, h3 {
          color: #FFFFFF;
          font-weight: 400;
        }
      }
      .rs-sub-headline {
        color: #DDDDDD;
        font-size: 13px;
        overflow: none;
      }
      .rs-button {
        border-radius: 6px;
        border-width: 2px;
        border-color: #555555;
        background: #555555;
        transition: all 0.25s;
        &:hover {
          background: #666666;
        }
      }
      .rs-button .rs-icon {
        fill: #FFFFFF;
      }
    }
  }
}
</style>
