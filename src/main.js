import Vue from 'vue'
import VueTextareaAutosize from 'vue-textarea-autosize'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import rs from './remote-storage'
import lyricsController from './multi-language-lyrics-controller'

Vue.config.productionTip = false

Vue.use(VueTextareaAutosize)

Vue.use({
  install (V) { /* eslint-disable no-param-reassign */
    V.prototype.$parseRuby = (text) => {
      const ruby = text.replace(/{{1}([^{}()]+)}{1}\({1}([^{}()]+)\){1}/gm, '<ruby>$1<rt>$2</rt></ruby>')
      return ruby
    }
    V.prototype.$rs = rs
    V.prototype.$lyricsController = lyricsController
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
