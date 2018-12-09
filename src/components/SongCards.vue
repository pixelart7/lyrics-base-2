<template lang="pug">
.song-cards
  NewSongCard
  SongCard(v-for="l in list", :id="l", :search="search")
</template>

<script>
import SongCard from '@/components/SongCard'
import NewSongCard from '@/components/NewSongCard'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    search: {
      type: String,
      default: ''
    }
  },
  components: {
    SongCard,
    NewSongCard
  }
}
</script>

<style lang="scss">
.song-cards {
  margin-bottom: -8px;
  margin-right: -8px;
}
</style>
