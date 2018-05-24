<document>
  不建议采用绝对相关定位，当图片多时非常影响性能
</document>

<template>
  <div class="mn-image">
    <div class="mn-image-holder"
      :class="{ 'is-active': !showSource }"
      :style="{
        'padding-bottom': `${ratio * 100}%`,
        'background-image': thumb ? `url(${thumb})` : undefined
      }"></div>
    <img class="mn-image-source"
      :class="{
        'is-active': showSource,
        [`is-${type}`]: !!type
      }"
      :src="showSource && source"
      :data-src="source"
      >
  </div>
</template>

<script>
  import Element from '../../utils/Element'

  export default new Element({
    name: 'mn-image',
    props: {
      title: String,
      alt: String,
      // 缩略图地址
      thumb: String,
      // 原图地址
      source: String,
      // ratio 表示的宽高比，如宽 200px，宽 100px，则 ratio 为 0.5
      ratio: {
        type: Number,
        default: 1
      },
      // type 起到修饰图片的作用，rounded 表示圆角图片，circle 表示圆形图片
      type: {
        type: String,
        validator: val => ['rounded', 'circle'].includes(val)
      }
    },
    data () {
      return {
        showSource: false
      }
    },
    methods: {
      observerSource () {
        if (!this.source || this.showSource) return

        const img = new Image()
        img.onload = () => {
          this.showSource = true
        }
        img.src = this.source
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.observerSource()
      })
    }
  })
</script>

<style lang="scss">
  @import "../../scss/mixins/media.scss";
  @import "./vars";

  .mn-image {
  }

  .mn-image-holder {
    display: none;
    width: 100%;
    background-color: #ddd;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    filter: blur(50px);

    &.is-active {
      display: block;
    }
  }

  .mn-image-source {
    display: none;
    width: 100%;

    &.is-rounded {
      border-radius: $mn-image-mobile-radius;

      @include min-screen('desktop') {
        border-radius: $mn-image-desktop-radius;
      }
    }

    &.is-circle {
      border-radius: 50% 50%;
    }

    &.is-active {
      display: block;
    }
  }
</style>
