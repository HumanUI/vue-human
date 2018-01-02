<template>
  <div class="mn-landPage__item">
    <transition
      enter-active-class="fadeIn animated">
      <div class="mn-landPage__item-wrapper" v-if="flag">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
  import Element from 'vue-human/utils/Element'
  export default new Element({
    name: 'mn-landPage-item',
    props: {
      itemIndex: {
        type: Number
      },
      defaultBgColor: {
        type: String
      }
    },
    data () {
      return {
        flag: false
        // backgroundColor: null
      }
    },
    mounted () {
      // this.backgroundColor = this.defaultBgColor
    },
    computed: {
    }
  })
</script>

<style lang="scss">

.mn-landPage {
  &__item {
    padding: 100px 20px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-wrapper {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      color: #303133;
    }
  }
}
</style>
