import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      meta: { scroll: true },
      component: resolve => { require(['./docs/home'], resolve) }
    },
    {
      path: '/bases/colors',
      component: resolve => { require(['./docs/bases/colors'], resolve) }
    },
    {
      path: '/bases/typography',
      component: resolve => { require(['./docs/bases/typography'], resolve) }
    },
    {
      path: '/grids/flex',
      component: resolve => { require(['./docs/grids/flex'], resolve) }
    },
    {
      path: '/components/button',
      component: resolve => { require(['./docs/components/button'], resolve) }
    },
    {
      path: '/components/card',
      component: resolve => { require(['./docs/components/card'], resolve) }
    },
    {
      path: '/components/form',
      component: resolve => { require(['./docs/components/form'], resolve) }
    },
    {
      path: '/components/popup',
      component: resolve => { require(['./docs/components/popup'], resolve) }
    },
    {
      path: '/components/icon',
      component: resolve => { require(['./docs/components/icon'], resolve) }
    },
    {
      path: '/components/searchbar',
      component: resolve => { require(['./docs/components/searchbar'], resolve) }
    },
    {
      path: '/components/tab',
      component: resolve => { require(['./docs/components/tab'], resolve) }
    },
    {
      path: '/components/tag',
      component: resolve => { require(['./docs/components/tag'], resolve) }
    },
    {
      path: '/components/rate',
      component: resolve => { require(['./docs/components/rate'], resolve) }
    },
    {
      path: '/components/control',
      component: resolve => { require(['./docs/components/control'], resolve) }
    },
    {
      path: '/components/navbar',
      component: resolve => { require(['./docs/components/navbar'], resolve) }
    }
  ]
})

router.beforeEach((to, from, next) => {
  Vue.human.saveScroll(from)
  next()
})

router.afterEach((to, from, next) => {
  Vue.human.setScroll(to)
})

export default router
