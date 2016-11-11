<template>
  <div class="section">
    <div class="letter">
      <div class="letter-body">
        <h1>Vue Human</h1>
        <small>A component sets for vue & human UI.</small>
      </div>
    </div>

    <mn-card v-for="menu in menus">
      <mn-card-item>
        {{ menu.title }}
      </mn-card-item>
      <mn-card-item type="link" @click.native="go(sub.route)" v-for="sub in menu.subMenus">
        <mn-icon slot="addon" :name="sub.icon"></mn-icon>
        <template slot="body">{{ sub.title }}</template>
      </mn-card-item>
    </mn-card>

  </div>
</template>

<script>
  export default {
    methods: {
      go (link) {
        this.$router.push(link)
      }
    },
    data () {
      return {
        menus: [
          {
            title: 'Bases',
            subMenus: [
              {
                title: 'colors',
                icon: 'ios-color-filter',
                route: { path: '/bases/colors' }
              },
              {
                title: 'typography',
                icon: 'wand',
                route: { path: '/bases/typography' }
              }
            ]
          },
          {
            title: 'Grids',
            subMenus: [
              {
                title: 'flex',
                icon: 'grid',
                route: { path: '/grids/flex' }
              }
            ]
          },
          {
            title: 'Components',
            subMenus: [
              {
                title: 'icon',
                icon: 'ios-analytics',
                route: { path: '/components/icon' }
              },
              {
                title: 'button',
                icon: 'ios-paperplane',
                route: { path: '/components/button' }
              },
              {
                title: 'card',
                icon: 'ios-photos',
                route: { path: '/components/card' }
              },
              {
                title: 'form',
                icon: 'ios-list',
                route: { path: '/components/form' }
              },
              {
                title: 'popup',
                icon: 'social-buffer',
                route: { path: '/components/popup' }
              },
              {
                title: 'searchbar',
                icon: 'ios-barcode',
                route: { path: '/components/searchbar' }
              },
              {
                title: 'tab',
                icon: 'ios-barcode-outline',
                route: { path: '/components/tab' }
              },
              {
                title: 'tag',
                icon: 'pricetags',
                route: { path: '/components/tag' }
              },
              {
                title: 'rate',
                icon: 'ios-star',
                route: { path: '/components/rate' }
              },
              {
                title: 'control',
                icon: 'ios-settings-strong',
                route: { path: '/components/control' }
              },
              {
                title: 'topnavbar',
                icon: 'ios-arrow-left',
                route: { path: '/components/topnavbar' }
              }
            ]
          }
        ]
      }
    }
  }
</script>
