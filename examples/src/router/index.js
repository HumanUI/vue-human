import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: resolve => { require(['../components/home'], resolve) }
    },
    {
      path: '/loading-icon',
      name: 'loadingIcon',
      component: resolve => { require(['../components/loadingIcon'], resolve) }
    },
    {
      path: '/icon',
      name: 'icon',
      component: resolve => { require(['../components/icon'], resolve) }
    },
    {
      path: '/card',
      name: 'card',
      component: resolve => { require(['../components/card'], resolve) }
    },
    {
      path: '/scroller',
      name: 'scroller',
      component: resolve => { require(['../components/scroller'], resolve) }
    },
    {
      path: '/swipe',
      name: 'swipe',
      component: resolve => { require(['../components/swipe'], resolve) }
    },
    {
      path: '/container',
      name: 'container',
      component: resolve => { require(['../components/container'], resolve) }
    },
    {
      path: '/section',
      name: 'section',
      component: resolve => { require(['../components/section'], resolve) }
    },
    {
      path: '/btn',
      name: 'btn',
      component: resolve => { require(['../components/btn'], resolve) }
    },
    {
      path: '/link',
      name: 'link',
      component: resolve => { require(['../components/link'], resolve) }
    },
    {
      path: '/image',
      name: 'image',
      component: resolve => { require(['../components/image'], resolve) }
    },
    {
      path: '/letter',
      name: 'letter',
      component: resolve => { require(['../components/letter'], resolve) }
    },
    {
      path: '/assistive-bar',
      name: 'assistiveBar',
      component: resolve => { require(['../components/assistiveBar'], resolve) }
    },
    {
      path: '/form',
      name: 'form',
      component: resolve => { require(['../components/form'], resolve) }
    },
    {
      path: '/turn',
      name: 'turn',
      component: resolve => { require(['../components/turn'], resolve) }
    },
    {
      path: '/counter',
      name: 'counter',
      component: resolve => { require(['../components/counter'], resolve) }
    },
    {
      path: '/input',
      name: 'input',
      component: resolve => { require(['../components/input'], resolve) }
    },
    {
      path: '/select',
      name: 'select',
      component: resolve => { require(['../components/select'], resolve) }
    },
    {
      path: '/textarea',
      name: 'textarea',
      component: resolve => { require(['../components/textarea'], resolve) }
    },
    {
      path: '/radio',
      name: 'radio',
      component: resolve => { require(['../components/radio'], resolve) }
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: resolve => { require(['../components/checkbox'], resolve) }
    },
    {
      path: '/alert',
      name: 'alert',
      component: resolve => { require(['../components/alert'], resolve) }
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: resolve => { require(['../components/confirm'], resolve) }
    },
    {
      path: '/loading-mask',
      name: 'loadingMask',
      component: resolve => { require(['../components/loadingMask'], resolve) }
    },
    {
      path: '/message',
      name: 'message',
      component: resolve => { require(['../components/message'], resolve) }
    },
    {
      path: '/action-sheet',
      name: 'actionSheet',
      component: resolve => { require(['../components/actionSheet'], resolve) }
    },
    {
      path: '/modal',
      name: 'modal',
      component: resolve => { require(['../components/modal'], resolve) }
    },
    {
      path: '/datetime',
      name: 'datetime',
      component: resolve => { require(['../components/datetime'], resolve) }
    },
    {
      path: '/article',
      name: 'article',
      component: resolve => { require(['../components/article'], resolve) }
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: resolve => { require(['../components/carousel'], resolve) }
    },
    {
      path: '/loading-bar',
      name: 'loadingBar',
      component: resolve => { require(['../components/loadingBar'], resolve) }
    },
    {
      path: '/menu',
      name: 'menu',
      component: resolve => { require(['../components/menu'], resolve) }
    },
    {
      path: '/nav-bar',
      name: 'navBar',
      component: resolve => { require(['../components/navBar'], resolve) }
    },
    {
      path: '/paginate',
      name: 'paginate',
      component: resolve => { require(['../components/paginate'], resolve) }
    },
    {
      path: '/rate',
      name: 'rate',
      component: resolve => { require(['../components/rate'], resolve) }
    },
    {
      path: '/search-bar',
      name: 'searchBar',
      component: resolve => { require(['../components/searchBar'], resolve) }
    },
    {
      path: '/tab-bar',
      name: 'tabBar',
      component: resolve => { require(['../components/tabBar'], resolve) }
    },
    {
      path: '/tag',
      name: 'tag',
      component: resolve => { require(['../components/tag'], resolve) }
    },
    {
      path: '/column',
      name: 'column',
      component: resolve => { require(['../components/column'], resolve) }
    },
    {
      path: '/page',
      name: 'page',
      component: resolve => { require(['../components/page'], resolve) }
    }
  ]
})

export default router
