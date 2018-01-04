<template>
  <div class="mn-swipe" ref="swipe">
    <div class="mn-swipe-content" ref="swipeGroup">
      <slot></slot>
    </div>
    <slot name="indicators">
      <div class="mn-swipe-indicators">
        <div class="mn-swipe-indicator"
          v-for="(item, $index) in dots"
          v-bind:key="$index"
          :class="{ 'is-active': $index === currentPageIndex}" ></div>
      </div>
    </slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'mn-swipe',
  props: {
    startIndex: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    },
    scrollEndCb: {
      type: Function,
      default: function() {}
    },
    scrollStartCb: {
      type: Function,
      default: function() {}
    },
    beforeScrollStartCb: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      dots: 0,
      _timer: null,
      _resizeTimer: null,
      currentPageIndex: this.startIndex || 0,
      scrollOption: {
        scrollX: true, //横向滚动
        scrollY: false, // 纵向滚动
        momentum: false, //
        tap: false, // 模仿原生click事件
        bounce: false, //超过边缘的回弹动画
        snap: {
          loop: this.loop, // 循环播放，只支持横向循环
          threshold: this.threshold, //滑动滚动阈值
          speed: this.speed // 滑动动画速度
        },
        click: true, // 派发点击事件
        observeDOM: false //会检测 scroller 内部 DOM 变化
      }
    }
  },
  methods: {
    refresh() {
      this.swipe && this.swipe.destroy()
      clearTimeout(this._timer)
      this.$nextTick(() => {
        this._initMethod()
      })
    },
    _initMethod() {
      this.dots = 0
      this._setSwipeWidth(false)
      this._initDots()
      this._initswipe()
      if (this.autoPlay) {
        this._play()
      }
    },
    _touchEndEvent() {
      if (this.autoPlay) {
          this._play()
        }
    },
    _setSwipeWidth(isResize) {
      this.children = this.$refs.swipeGroup.children
      let width = 0
      let swipeWidth = this.$refs.swipe.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        child.style.width = swipeWidth + 'px'
        width += swipeWidth
      }
      if (this.loop && !isResize) {
        width += 2 * swipeWidth
      }
      this.$refs.swipeGroup.style.width = width + 'px'
    },
    _initswipe() {
      this.swipe = new BScroll(this.$refs.swipe, this.scrollOption)

      this.swipe.goToPage(this.currentPageIndex, 0, 0)
      //@todo 事件添加
      this.swipe.on('scrollEnd', this._onScrollEnd)

      window.removeEventListener('touchend', this._touchEndEvent, false)

      window.addEventListener('touchend', this._touchEndEvent, false)

      // 滚动结束回调
      this.swipe.on('scrollEnd', () => {
        this.scrollEndCb()
      })
      // *手动*滚动开始回调
      this.swipe.on('scrollStart', () => {
        this.scrollStartCb()
      })
      // 滚动开始前回调
      this.swipe.on('beforeScrollStart', () => {
        this.beforeScrollStartCb()
      })
      this.swipe.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this._timer)
        }
      })
    },
    _updatePageIndex() {
      const pageIndex = this.swipe.getCurrentPage().pageX
      if (this.currentPageIndex !== pageIndex) {
        this.currentPageIndex = pageIndex
        this.$emit('change', this.currentPageIndex)
      }
      if (this.autoPlay) {
        this._play()
      }
    },
    _onScrollEnd() {
      this._updatePageIndex()
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      clearTimeout(this._timer)
      this._timer = setTimeout(() => {
        this.swipe.next()
      }, this.interval)
    },
    _resize() {
      clearTimeout(this._resizeTimer)
      this._resizeTimer = setTimeout(() => {
        if (this.swipe.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }
        this.refresh()
      }, 60)
    }
  },
  mounted() {
    this.refresh()
    window.addEventListener('resize', () => {
      if (!this.swipe || !this.swipe.enable) return
      this._resize()
    })
  },
  activated() {
    if (!this.swipe) return
    this.swipe.enable()
    this._updatePageIndex()
  },
  deactivated() {
    this.swipe.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    this.swipe.disable()
    clearTimeout(this.timer)
  }
}
</script>
