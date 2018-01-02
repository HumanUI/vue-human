export default [
  {
    name: '首页',
    push: { name: 'homepage' }
  },
  {
    name: '核心',
    badge: {
      theme: 'gray-darkest',
      content: 'core',
      size: 'sm'
    },
    children: [
      {
        name: '按钮',
        push: { name: 'button' }
      },
      {
        name: '图标',
        push: { name: 'icon' }
      },
      {
        name: '滚动条',
        push: { name: 'scroller' }
      },
      {
        name: '页面容器',
        push: { name: 'container' }
      },
      {
        name: '12 列布局',
        push: { name: 'column' }
      },
      {
        name: '卡片列表',
        push: { name: 'card' },
        badge: {
          content: 'H!',
          size: 'sm',
          theme: 'pink'
        }
      },
      {
        name: '表单与验证',
        push: { name: 'form' }
      }
    ]
  },
  {
    name: '控件',
    children: [
      {
        name: '单行文本框',
        push: { name: 'input' }
      },
      {
        name: '单选',
        push: { name: 'radio' }
      },
      {
        name: '多选',
        push: { name: 'check' }
      },
      {
        name: '下拉菜单',
        push: { name: 'select' }
      },
      {
        name: '开关',
        push: { name: 'turn' }
      },
      {
        name: '多行文本框',
        push: { name: 'textarea' }
      },
      {
        name: '计数器',
        push: { name: 'counter' }
      },
      {
        name: '日期时间',
        push: { name: 'datetime' }
      }
    ]
  },
  {
    name: '浮层',
    children: [
      {
        name: '消息框',
        push: { name: 'message' }
      },
      {
        name: '确认框',
        push: { name: 'confirm' }
      },
      {
        name: '警告框',
        push: { name: 'alert' }
      },
      {
        name: '加载动画',
        push: { name: 'loadingMask' }
      },
      {
        name: '模态对话框',
        push: { name: 'modal' }
      },
      {
        name: '操作列表',
        push: { name: 'actionSheet' }
      }
    ]
  },
  {
    name: '组件库',
    children: [
      {
        name: '图片',
        push: { name: 'image' }
      },
      {
        name: '页码',
        push: { name: 'paginate' }
      },
      {
        name: '单元列表',
        push: { name: 'cell' }
      },
      {
        name: '轮播图',
        push: { name: 'carousel' }
      },
      {
        name: '标签',
        push: { name: 'tag' }
      },
      {
        name: '搜索条',
        push: { name: 'searchBar' }
      },
      {
        name: '评分',
        push: { name: 'rate' }
      },
      {
        name: '底部栏',
        push: { name: 'tabBar' }
      },
      {
        name: '顶部栏',
        push: { name: 'navBar' }
      },
      {
        name: '手风琴',
        push: { name: 'menu' }
      },
      {
        name: '表格',
        push: { name: 'table' }
      },
      {
        name: '全屏滚动',
        push: { name: 'landPage' }
      }
    ]
  }
]
