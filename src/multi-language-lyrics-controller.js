import Color from 'color'
import nearestColorModule from 'nearest-color'
import rs from './remote-storage'

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// https://fluentcolors.com/ , except last 2 col
const availableColors = [
  '#FFB900',
  '#FF8C00',
  '#F7630C',
  '#CA5010',
  '#DA3B01',
  '#EF6950',
  '#D13438',
  '#FF4343',
  '#E74856',
  '#E81123',
  '#EA005E',
  '#C30052',
  '#E3008C',
  '#BF0077',
  '#C239B3',
  '#9A0089',
  '#0078D7',
  '#0063B1',
  '#8E8CD8',
  '#6B69D6',
  '#8764B8',
  '#744DA9',
  '#B146C2',
  '#881798',
  '#0099BC',
  '#2D7D9A',
  '#00B7C3',
  '#038387',
  '#00B294',
  '#018574',
  '#10893E',
  '#00CC6A'
]
const availableColorsObject = {}
availableColors.forEach((elm) => {
  if (Color(elm).isDark()) availableColorsObject[elm] = elm
})
const nearestColor = nearestColorModule.from(availableColorsObject)

const controller = {
  utils: {
    title: {
      parse (string) {
        const splited = string.split(' - ')
        return {
          title: splited[1],
          artist: splited[0]
        }
      },
      stringify (songTitleObject) {
        return `${songTitleObject.artist} - ${songTitleObject.title}`
      }
    },
    artist: {
      colorHash (inputString) { /* eslint-disable */
        let sum = 0;

        inputString.split('').forEach((s, i) => {
          sum = sum + inputString.charCodeAt(i)
        })

        const r = ~~(('0.' + Math.sin(sum + 1).toString().substr(6)) * 256)
        const g = ~~(('0.' + Math.sin(sum + 2).toString().substr(6)) * 256)
        const b = ~~(('0.' + Math.sin(sum + 3).toString().substr(6)) * 256)

        let color = Color.rgb(r, g, b)

        const nearest = nearestColor(color.hex()).rgb
        color = Color(nearest)

        const rgbColorObject = color.rgb().object()

        return {
          bg: `${rgbColorObject.r},${rgbColorObject.g},${rgbColorObject.b}`
        }
      }
    },
    lyrics: {
      parseRuby (text) {
        const ruby = text.replace(/{{1}([^{}()]+)}{1}\({1}([^{}()]+)\){1}/gm, '<ruby>$1<rt>$2</rt></ruby>');
        return ruby;
      }
    }
  },
  get: {
    async allLyrics () {
      const list = await rs['multi-language-lyrics'].list()
      return list
    },
    async lyrics (id) {
      const single = await rs['multi-language-lyrics'].get(id)
      return single
    },
    async allArtists () {
      const allArtists = []
      const allLyrics = await controller.get.allLyrics()
      await asyncForEach(Object.keys(allLyrics), async (id) => {
        const lyrics = await controller.get.lyrics(id)
        const songObject = controller.utils.title.parse(lyrics.title)
        allArtists.push(songObject.artist)
      })
      return Array.from(new Set(allArtists)) // unique items
    }
  },
  delete: {
    async lyrics (id) {
      await rs['multi-language-lyrics'].deleteLyrics(id)
    }
  },
  add: {
    /* {title = '', tags = [], lyrics = [ {lang: 'original', lyrics: ''}, {lang: 'translate', lyrics: ''} ] } */
    async lyrics (lyricsObject) {
      await rs['multi-language-lyrics'].add(lyricsObject)
    }
  },
  update: {
    async lyrics (id, lyricsObject) {
      await rs['multi-language-lyrics'].update(id, lyricsObject)
    }
  }
}

export default controller