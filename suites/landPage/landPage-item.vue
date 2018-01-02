<template>
  <div class="mn-landPage__item">
    <transition
      enter-active-class="fadeIn animated">
      <div class="mn-landPage__item-body" v-if="flag">
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
      }
    },
    data () {
      return {
        flag: false
      }
    },
    mounted () {
    },
    computed: {
    }
  })
</script>

<style lang="scss">

.mn-landPage {
  &__item {
    // display: flex;
    padding: 5rem 1rem;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-body {
      // flex-grow: 1
      width: 100%;
      height: 100%;
    }
  }
}
</style>
