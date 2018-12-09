import RemoteStorage from 'remotestoragejs'

const GOOGLE_DRIVE_ID = process.env.GOOGLE_CLIENT_ID
const uuidv4 = (a) => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuidv4); // eslint-disable-line

const MultiLanguageLyrics = {
  name: 'multi-language-lyrics',
  builder (privateClient) {
    // console.log(publicClient);
    privateClient.declareType('lyrics', {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        title: {
          type: 'string'
        },
        tags: {
          type: 'array',
          default: []
        },
        lyrics: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              lang: {
                type: 'string'
              },
              lyrics: {
                type: 'string'
              }
            }
          }
        }
      }
    })
    return {
      exports: {
        get (id) {
          return privateClient.getObject(`lyrics/${id}`)
        },
        list () {
          return privateClient.getListing('lyrics/')
        },
        deleteLyrics (id) {
          return privateClient.remove(`lyrics/${id}`)
        },
        update (id, lyrics) {
          const lyricsWithId = lyrics
          lyricsWithId.id = id
          const path = `lyrics/${lyricsWithId.id}`
          return privateClient.storeObject('lyrics', path, lyricsWithId).then(() => lyricsWithId)
        },
        add (lyrics) {
          const lyricsWithId = lyrics
          lyricsWithId.id = uuidv4()
          const path = `lyrics/${lyricsWithId.id}`
          return privateClient.storeObject('lyrics', path, lyricsWithId).then(() => lyricsWithId)
        }
      }
    }
  }
}

const remoteStorage = new RemoteStorage({
  modules: [MultiLanguageLyrics]
})
remoteStorage.access.claim('multi-language-lyrics', 'rw')
remoteStorage.caching.enable('/multi-language-lyrics/')
remoteStorage.setApiKeys({
  googledrive: GOOGLE_DRIVE_ID
})

export default remoteStorage
