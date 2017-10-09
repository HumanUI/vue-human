import Vue from 'vue'

export default [
  {
    name: Vue.t('examples.menus.home'),
    push: { name: 'homepage' }
  },
  {
    name: Vue.t('examples.menus.core'),
    badge: {
      theme: 'gray-darkest',
      content: 'core',
      size: 'sm'
    },
    children: [
      {
        name: Vue.t('examples.submenus.core.button'),
        push: { name: 'button' }
      },
      {
        name: Vue.t('examples.submenus.core.icon'),
        push: { name: 'icon' }
      },
      {
        name: Vue.t('examples.submenus.core.scroller'),
        push: { name: 'scroller' }
      },
      {
        name: Vue.t('examples.submenus.core.container'),
        push: { name: 'container' }
      },
      {
        name: Vue.t('examples.submenus.core.column'),
        push: { name: 'column' }
      },
      {
        name: Vue.t('examples.submenus.core.card'),
        push: { name: 'card' },
        badge: {
          content: 'H!',
          size: 'sm',
          theme: 'pink'
        }
      },
      {
        name: Vue.t('examples.submenus.core.form'),
        push: { name: 'form' }
      }
    ]
  },
  {
    name: Vue.t('examples.menus.form'),
    children: [
      {
        name: Vue.t('examples.submenus.form.input'),
        push: { name: 'input' }
      },
      {
        name: Vue.t('examples.submenus.form.radio'),
        push: { name: 'radio' }
      },
      {
        name: Vue.t('examples.submenus.form.check'),
        push: { name: 'check' }
      },
      {
        name: Vue.t('examples.submenus.form.select'),
        push: { name: 'select' }
      },
      {
        name: Vue.t('examples.submenus.components.selectList'),
        push: { name: 'selectList' }
      },
      {
        name: Vue.t('examples.submenus.form.turn'),
        push: { name: 'turn' }
      },
      {
        name: Vue.t('examples.submenus.form.textarea'),
        push: { name: 'textarea' }
      },
      {
        name: Vue.t('examples.submenus.form.counter'),
        push: { name: 'counter' }
      },
      {
        name: Vue.t('examples.submenus.form.datetime'),
        push: { name: 'datetime' }
      }
    ]
  },
  {
    name: Vue.t('examples.menus.popup'),
    children: [
      {
        name: Vue.t('examples.submenus.popup.message'),
        push: { name: 'message' }
      },
      {
        name: Vue.t('examples.submenus.popup.confirm'),
        push: { name: 'confirm' }
      },
      {
        name: Vue.t('examples.submenus.popup.alert'),
        push: { name: 'alert' }
      },
      {
        name: Vue.t('examples.submenus.popup.loadingMask'),
        push: { name: 'loadingMask' }
      },
      {
        name: Vue.t('examples.submenus.popup.modal'),
        push: { name: 'modal' }
      },
      {
        name: Vue.t('examples.submenus.popup.actionSheet'),
        push: { name: 'actionSheet' }
      }
    ]
  },
  {
    name: Vue.t('examples.menus.components'),
    children: [
      {
        name: Vue.t('examples.submenus.core.image'),
        push: { name: 'image' }
      },
      {
        name: Vue.t('examples.submenus.components.paginate'),
        push: { name: 'paginate' }
      },
      {
        name: Vue.t('examples.submenus.components.cell'),
        push: { name: 'cell' }
      },
      {
        name: Vue.t('examples.submenus.components.carousel'),
        push: { name: 'carousel' }
      },
      {
        name: Vue.t('examples.submenus.components.tag'),
        push: { name: 'tag' }
      },
      {
        name: Vue.t('examples.submenus.components.searchBar'),
        push: { name: 'searchBar' }
      },
      {
        name: Vue.t('examples.submenus.components.rate'),
        push: { name: 'rate' }
      },
      {
        name: Vue.t('examples.submenus.components.tabBar'),
        push: { name: 'tabBar' }
      },
      {
        name: Vue.t('examples.submenus.components.navBar'),
        push: { name: 'navBar' }
      },
      {
        name: Vue.t('examples.submenus.components.menu'),
        push: { name: 'menu' }
      },
      {
        name: Vue.t('examples.submenus.components.table'),
        push: { name: 'table' }
      }
    ]
  }
]
