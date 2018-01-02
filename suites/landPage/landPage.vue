<template>
  <div class="mn-landPage">
    <transition
      enter-active-class="fadeIn animated"
      leave-active-class="fadeOut animated">
      <div
        class="mn-landPage__btn mn-landPage__btn-prev"
        v-if="turnPageBtn && touchState.index > 0"
        @click="isPhone ? null : scorllToItem(touchState.index - 1)"
        @touchstart="isPhone ? scorllToItem(touchState.index - 1) : null">
        <i class="self__icon__arrow-up mn-landPage__btn-icon"></i>
      </div>
    </transition>
    <div
      class="mn-landPage__body"
      @mousewheel="isPhone ? null : debouncePlan($event)"
      @touchstart="isPhone ? setStartPosition($event) : null"
      @touchend="isPhone ? handleDirection($event) : null">
      <div class="mn-landPage__body-scroll"
        ref="landPage_body"
        @transitionend='beforeToNextItem'>
        <slot></slot>
      </div>
    </div>
    <div
      class="mn-landPage__index"
      :style="{
        transform: `rotateY(${touchState.index * 360}deg)`
      }"
      v-if="pageNumber">
      {{touchState.index + 1}}
    </div>
    <transition
      enter-active-class="fadeIn animated"
      leave-active-class="fadeOut animated">
      <div
        class="mn-landPage__btn mn-landPage__btn-next"
        v-if="turnPageBtn && touchState.index < this.maxIndex - 1"
        @click="isPhone ? null : scorllToItem(touchState.index + 1)"
        @touchStart="isPhone ? scorllToItem(touchState.index + 1) : null">
        <!-- <mn-icon :name="iosArrowUp" class="mn-landPage__btn-icon"></mn-icon> -->
        <i class="self__icon__arrow-down mn-landPage__btn-icon"></i>
      </div>
    </transition>
  </div>
</template>
<script>
  // import iosArrowUp from 'vue-human-icons/js/ios/arrow-up'
  // import iosArrowDown from 'vue-human-icons/js/ios/arrow-down'
  import Element from 'vue-human/utils/Element'
  import { isPhone } from './utils'
  import { throttle, debounce } from 'lodash'
  export default new Element({
    name: 'mn-landPage',
    props: {
      turnPageBtn: {
        type: Boolean,
        default: false
      },
      pageNumber: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // iosArrowUp: iosArrowUp,
        // iosArrowDown: iosArrowDown,
        touchState: {
          index: 0,
          startPosition: -1
        },
        maxIndex: 0
      }
    },
    computed: {
      isPhone () {
        return isPhone()
      },
      throttlePlan (e) {
        return throttle(this.handleWheel(e), 100)
      },
      debouncePlan (e) {
        return debounce(this.handleWheel(e), 100)
      }
    },
    mounted () {
      // this.maxIndex = this.$children.length
      let len = 0
      this.$children.forEach((node) => {
        if (node.$el.className.indexOf('mn-landPage__item') > -1) {
          len++
        }
      })
      this.maxIndex = len

      if (this.$children.length > 0) {
        this.beforeToNextItem()
        window.addEventListener('resize', this.resizeToIndex)
      }
    },
    beforeDestory () {
      window.removeEventListener('resize', this.resizeToIndex)
    },
    methods: {
      resizeToIndex: debounce(function () {
        this.scorllToItem(this.touchState.index)
      }, 100),
      setBackgroundColor (val) {
        const item = this.$children.find((item) => {
          return item.itemIndex === this.touchState.index
        })
        console.log(item)
      },
      handleWheel (e) {
        return (e) => {
          if (e.wheelDelta > 0) {
            this.scorllToItem(this.touchState.index - 1)
          } else {
            this.scorllToItem(this.touchState.index + 1)
          }
        }
      },
      setStartPosition (e) {
        this.touchState.startPosition = e.changedTouches[0].pageY
      },
      handleDirection (e) {
        const currentPositionY = e.changedTouches[0].pageY
        const shift = currentPositionY - this.touchState.startPosition
        if (shift > 0) {
          if (this.touchState.index < this.maxIndex - 1) {
            this.scorllToItem(this.touchState.index + 1)
          }
        } else if (shift < 0) {
          if (this.touchState.index > 0) {
            this.scorllToItem(this.touchState.index - 1)
          }
        }
      },
      scorllToItem (index) {
        if (index < 0 || index > this.maxIndex - 1) {
          return
        }
        const wrapper = this.$refs.landPage_body
        this.$nextTick(() => {
          this.touchState.index = index
          wrapper.style.transform = `translateY(-${this.touchState.index * wrapper.offsetHeight}px)`
        })
      },
      beforeToNextItem () {
        const item = this.$children.find((item) => {
          return item.itemIndex === this.touchState.index
        })
        item.flag = true
      }
    }
  })
</script>
<style lang="scss">
// @import './animate.css';
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fadeOut {
  animation-name: fadeOut;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeIn {
  animation-name: fadeIn;
}
@keyframes pulse {
  from {
    transform: scale3d(1, 1, 1);
  }
  50% {
    transform: scale3d(1.2, 1.2, 1.2);
  }
  to {
    opacity: 0;
    transform: scale3d(1, 1, 1);
  }
}
@keyframes pulse-small {
  from {
    transform: scale3d(1, 1, 1);
  }
  50% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
}
.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.mn-landPage {
  @extend .full;
  overflow: hidden;
  &__body {
    position: relative;
    width: 100%;
    height: 100%;
    &-scroll {
      width: 100%;
      height: 100%;
      transition-duration: 1s;
    }
  }
  &__btn {
    position: absolute;
    left: 50%;
    z-index: 10;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    transform: translate(-50%, 0);
    cursor: pointer;
    &-prev {
      top: 10px;
    }
    &-next {
      bottom: 10px;
    }
    &-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      // transform: translate(-50%,-50%);
      margin-left: -14px;
      margin-top: -14px;
      padding: 4px;
      width: 28px;
      height: 28px;
      animation: 0.8s pulse-small infinite;
      z-index: 40;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      border-radius: 16px;
      background-color: rgba(0,0,0,0.6)
    }
    &:after {
      content: '';
      position: absolute;
      z-index: 30;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: 0.8s pulse infinite;
      background-color: rgba(0,0,0,0.5)
    }
  }
  &__index {
    position: absolute;
    right: 4px;
    top: 10px;
    z-index: 20;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 50%;
    transition-duration: 0.4s;
  }
  &__color-picker {
    position: absolute;
    left: 4px;
    top: 10px;
  }
}
.el-color-picker__color-inner {
  transition-duration: 0.2s
}
.self__icon__arrow {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    width: 12px;
    height: 12px;
    border-top-width: 1px;
    border-left-width: 1px;
    border-radius: 2px;
    border-color: #fff transparent transparent #fff;
    border-style: solid
}
.self__icon__arrow {
  &-down {
    &::before {
      @extend .self__icon__arrow;
      transform: translate(8px,4px)rotate(-135deg);
    }
    &::after {
      @extend .self__icon__arrow;
      transform: translate(8px,-2px) rotate(-135deg);
    }
  }
  &-up {
    &::before {
      @extend .self__icon__arrow;
      transform: translate(8px,4px)rotate(45deg);
    }
    &::after {
      @extend .self__icon__arrow;
      transform: translate(8px,10px) rotate(45deg);
    }
  }

}
</style>
