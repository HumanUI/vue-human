<template>
  <div
    class="mn-scroller"
    :class="{ 'is-hide-bar': !scrollbar }"
    ref="container"
    >
    <slot name="header" ></slot>
    <div class="mn-scroller-contents" ref="contents" :style="handleContainerHeight">
      <!-- scroller contents -->
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import Scrollers from './Scrollers'

/**
   * Scroller component
   */
export default {
  name: 'mn-scroller',
  props: {
    /**
       * Do scroller save the top scroll value
       */
    save: {
      type: Boolean,
      default: true
    },
    /**
       * The scroller name.
       * if have two scroller in one page, you need set thier name.
       */
    name: {
      type: String,
      default: 'default'
    },
    /**
       * Save mode.
       * full only include path,
       * fullPath include path and string query
       */
    mode: {
      type: String,
      default: 'path',
      validator: val => ['path', 'fullPath'].includes(val)
    },
    /**
     * enable pull down mode
    */
    pullDown: {
      type: Boolean,
      default: false
    },
    /**
       * Show scrollbar
       */
    scrollbar: {
      type: Boolean,
      default: false
    },
    /**
     * trigger refresh flag
     */
    refreshStatus: {
      type: Boolean,
      default: false
    },
    scrollHeadHeight: {
      type: Number,
      default: 300
    },
    scrollContainerHeight: {
      type: Number,
      default: 300
    }
  },
  computed: {
    handleContainerHeight() {
      return {
        height: `${this.scrollContainerHeight}px`,
      }
    }
  },
  data() {
    return {
      /**
         * @todo remove
         */
      scrollers: [],
      time: undefined,
      createdScrollTop: false,
      scrollOptions: {
        threshold: 0.3,
        scrollContainerHeight: this.scrollContainerHeight,
        percentage: 0,
        enablePullDown: this.pullDown,
        enablePullUp: true,
        container: null,
        touchStartFn: this.touchStartFn,
        touchMoveFn: this.touchMoveFn,
        touchEndFn: this.touchEndFn
      }
    }
  },
  watch: {
    refreshStatus(newVal, oldVal) {
      if (newVal) {
        this.resetRefreshingStatus()
      }
    }
  },
  methods: {
    touchStart(event) {
      // Save origin pageX and pageY in touchStart
      // this.startPageY = event.touches[0].pageY
      // this.startPageX = event.touches[0].pageX
    },
    touchMove(event) {
      // let pageY = event.touches[0].pageY
      // let scrollTop = this.$refs.contents.scrollTop
      // let scrollHeight = this.$refs.contents.scrollHeight
      // let containerHeight = this.$refs.contents.offsetHeight
      // // If startPageX is too low,
      // // allow swipe to right to emit browser back event.
      // if (this.startPageX > 16) {
      //   // prevent top scroll less than 0, case in safari or wechat browser.
      //   if (pageY > this.startPageY && scrollTop <= 0) {
      //     event.preventDefault()
      //   }
      //   // prevent top scroll great than container height, case in safari or wechat browser.
      //   if (
      //     pageY < this.startPageY &&
      //     scrollTop >= scrollHeight - containerHeight
      //   ) {
      //     event.preventDefault()
      //   }
      // }
    },
    touchEnd(event) {},
    scrollFn(event) {
      this.scrollAndTouchEnd(event)

      /**
         * @event scroll
         * @property {Event} event - DOM Event
         * @property {VueComponent} scroller - scroller self
         */
      this.$emit('scroll', event, this)
    },
    scrollAndTouchEnd(event) {
      this.saveScrollTop()

      // pull to the scroller top
      if (this.$refs.contents.scrollTop <= 0) {
        /**
           * @event top
           * @property {Event} event - DOM Event
           * @property {VueComponent} scroller - scroller self
           */
        this.$emit('top', event, this)
      }

      // push to the scroller bottom
      if (
        this.$refs.contents.offsetHeight >=
        this.$refs.contents.scrollHeight - this.$refs.contents.scrollTop
      ) {
        /**
           * @event bottom
           * @property {Event} event - DOM Event
           * @property {VueComponent} scroller - scroller self
           */
        this.$emit('bottom', event, this)
      }
    },
    getRoutePath() {
      return this.$route[this.mode]
    },
    createScrollTop() {
      // The method will be exec in mounted hook.
      // Check the app install `vue-router`,
      // and allow to save the top scroll value.
      if (!this.$route || !this.save) return
      // Get scroller top from share state, and give the value to the scroller.
      this.$refs.contents.scrollTop = this.scrollers.getScroller(
        this.getRoutePath(),
        this.name
      ).top
      // Set createdScrollTop is true,
      // In order to tell the scroller: the scrollTop complete initialization.
      // After initialization, the scroller can save new scrollTop value.
      this.createdScrollTop = true
    },
    saveScrollTop() {
      // Check the app install `vue-router`,
      // and allow to save the top scroll value.
      // And the scrollTop after initialization, it can save new value.
      if (!this.$route || !this.save || !this.createdScrollTop) return
      // Save new scrollTop value.
      this.scrollers.addScroller(
        this.getRoutePath(),
        this.name,
        this.$refs.contents.scrollTop
      )
    },
    touchStartFn(event) {
      /**
         * @event touchstart
         * @property {Event} event - DOM Event
         * @property {VueComponent} scroller - scroller self
         */
      this.$emit('touchstart', event, this)
      /**
       * @event touchstartevent
       * @property {Event} event - DOM Event
       * @property {VueComponent} scroller - scroller self
       */
      this.$emit('touchstartevent', event, this)
    },
    touchMoveFn(event, precent, direction) {

      /**
         * @event touchmove
         * @property {Event} event - DOM Event
         * @property {VueComponent} scroller - scroller self
         */
      this.$emit('touchmove', event, this)
      /**
       * @event touchmoveevent
       * @property {Event} event - DOM Event
       * @property {VueComponent} scroller - scroller self
       * @property {number} precent - threshold precent
       * @property {string} direction - scroll direction
       */
      this.$emit('touchmoveevent', event, this, precent, direction)
    },
    touchEndFn(event, precent, direction) {
      this.scrollAndTouchEnd(event)
      /**
         * @event touchend
         * @property {Event} event - DOM Event
         * @property {VueComponent} scroller - scroller self
         */
      this.$emit('touchend', event, this)
      /**
       * @event touchendevent
       * @property {Event} event - DOM Event
       * @property {VueComponent} scroller - scroller self
       * @property {number} precent - threshold precent
       */
      this.$emit('touchendevent', event, this, precent, direction)
    },
    watchRefresh() {},
    resetRefreshingStatus() {
      this.scrollers.resetRefreshingStatusFn(false)
    }
  },
  mounted() {
    /**
     * create scroller instance to save scroller anchor
    */
    this.$nextTick(() => {
      this.scrollOptions.container = this.$refs.contents
      this.scrollers = new Scrollers(this.scrollOptions)
      // Execute createScrollTop
      // TODO: exec createscrolltop fter app page loaded their DOM
      this.createScrollTop()
    })
  },
  beforeDestroy() {
    if (this.scrollers) {
      this.scrollers.destroy()
    }
  }
}
</script>
