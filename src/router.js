import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import LyricsViewer from '@/views/LyricsViewer'
import LyricsEditor from '@/views/LyricsEditor'
import PrivacyPolicy from '@/views/PrivacyPolicy'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicy
    },
    {
      path: '/lyrics/:id/view',
      name: 'lyrics-viewer',
      component: LyricsViewer
    },
    {
      path: '/lyrics/:id/edit',
      name: 'lyrics-editor',
      component: LyricsEditor
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
