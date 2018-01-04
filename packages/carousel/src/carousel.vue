<template>
  <div
    class="mn-carousel"
    :class="{}"
    @click.prevent="onClick"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd">
    <div class="mn-carousel-content" ref="slide"
 :style="[
      { transform: translateX },
      transition
    ]">
      <slot></slot>
    </div>
    <slot name="indicators">
      <div class="mn-carousel-indicators">
        <div class="mn-carousel-indicator"
          @click.prevent.stop="setIndex(item - 1)"
          v-for="(item, $index) in length"
          v-bind:key="$index"
          :class="{ 'is-active': $index === index}" >{{$index}}</div>
      </div>
    </slot>
  </div>
</template>

<script>
/**
   * 轮播组件
   * @module suites/carousel/carousel
   * @example
   * <mn-carousel>...</mn-carousel>
   *
   * @slot  default    - carousel item
   */
export default {
  name: "mn-carousel",
  data() {
    return {
      carousel: null,
      startPageX: undefined, // touch 坐标
      startPageY: undefined, // touch 坐标
      length: 0, // carousel item length
      index: 0, // 目前轮播的 item 的下标
      x: 0, // 横向偏移值
      width: undefined, // carousel 的宽度
      transitionOpen: false, // 动画效果是否开启
      autoplayDuration: 2000, // 循环轮播的间隔时间
      autoplayDelay: 2000, // 循环轮播延迟多久后启动
      requestAutoplay: true // 是否请求循环轮播
    };
  },
  computed: {
    translateX() {
      return `translateX(${this.x * -1}px)`;
    },
    transition() {
      return this.transitionOpen
        ? { transition: "transform 0.5s ease-out" }
        : { transition: "none" };
    }
  },
  methods: {
    /**
       * 修改 item length
       * @public setLength
       * @param {Number} length
       */
    setLength(length) {
      this.length = length;
      return this;
    },
    /**
       * 切换图片
       * @public setIndex
       * @param  {Number} index 0 为第一张
       * @return {this}
       */
    setIndex(index) {
      this.index = index;
      this.x = this.width * this.index;
      this.closeAutoplay().delayOpenAutoplay();
      return this;
    },
    /**
       * 切换下一张图片
       * @public nextIndex
       * @return {this}
       */
    nextIndex() {
      let nextIndex = this.index + 1;
      this.setIndex(nextIndex > this.length - 1 ? 0 : nextIndex);
      return this;
    },
    /**
       * 切换上一张图片
       * @public prevIndex
       * @return {this}
       */
    prevIndex() {
      const prevIndex = this.index - 1;
      this.setIndex(prevIndex < 0 ? this.length - 1 : prevIndex);
      return this;
    },
    /**
       * 开启或关闭循环播放
       * @public autoplay
       * @param  {Boolean} active true 为开启，false 为关闭
       * @return {this}
       */
    autoplay(active) {
      this.requestAutoplay = active;
      active ? this.openAutoplay() : this.closeAutoplay();
      return this;
    },
    touchStart(event) {
      this.closeAutoplay();
      this.startPageY = event.touches[0].pageY;
      this.startPageX = event.touches[0].pageX;
      this.movePageX = this.startPageX;
      this.transitionOpen = false;
    },
    touchMove(event) {
      let offsetY = this.startPageY - event.touches[0].pageY;
      let offsetX = this.movePageX - event.touches[0].pageX;

      // 上下偏移小于 10 的范围内，左右偏移要大于 10 的范围，才触发
      if (
        (offsetY >= -10 || offsetY <= 10) &&
        (offsetX >= 10 || offsetX <= -10)
      ) {
        event.preventDefault();

        if (this.index === 0 && offsetX < -36) {
          return;
        }
        if (this.index === this.length - 1 && offsetX > 26) {
          return;
        }
        // 修改 x 的距离
        this.x = this.x + offsetX;
        // 变化起始点
        this.movePageX = event.touches[0].pageX;
      }
    },
    touchEnd(event) {
      if (
        this.index < this.length + 1 - 1 &&
        this.movePageX - this.startPageX < this.width * -0.1
      ) {
        this.index += 1;
      } else if (
        this.index > 0 &&
        this.movePageX - this.startPageX > this.width * 0.1
      ) {
        this.index += -1;
      }
      this.transitionOpen = true;
      this.x = this.width * this.index;
      this.delayOpenAutoplay();
      if (this.index >= this.length) {
        this.index = 0;
        const timer = setTimeout(
          function() {
            this.transitionOpen = false;
            this.x = this.width * this.index;
            clearTimeout(timer);
          }.bind(this),
          500
        );
        return;
      }
    },
    setElementWidth() {
      if (this.width !== this.$el.offsetWidth) {
        this.width = this.$el.offsetWidth;
      }
    },
    openAutoplay() {
      if (!this.autoplayInterval) {
        this.autoplayInterval = setInterval(
          this.nextIndex,
          this.autoplayDuration
        );
      }
      return this;
    },
    closeAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = undefined;
      }
      return this;
    },
    delayOpenAutoplay() {
      return new Promise(resolve => {
        setTimeout(() => {
          if (this.requestAutoplay) this.openAutoplay();
          resolve();
        }, this.autoplayDelay);
      });
    },
    onClick(event) {
      // 移除该功能
      // if (event.offsetX === undefined) return
      // if (event.offsetX < this.width / 2) {
      //   this.prevIndex()
      // } else {
      //   this.nextIndex()
      // }
    },
    initElement() {
      this.$nextTick(() => {
        let nodes = Array.from(this.$refs.slide.children);
        if (nodes.length < 2) return;
        let head = nodes[0].cloneNode(nodes[0], true);

        this.$refs.slide.appendChild(head);
      });
    }
  },
  watch: {
    index(newValue) {
      this.$emit("index", newValue);
    },
    length(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.initElement();
        this.setIndex(0);
      }
      this.$emit("length", newValue);
    }
  },
  created() {
    // 初始化时获得 items 数量
    if (!this.$slots.default) {
      this.length = 0;
    } else {
      this.length = this.$slots.default.filter(
        item => item.tag && item.tag.includes("mn-carousel-item")
      ).length;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setElementWidth();
      window.addEventListener("resize", this.setElementWidth);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setElementWidth);
  }
};
</script>
