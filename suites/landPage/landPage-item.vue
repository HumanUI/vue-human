<template>

    <transition
      enter-active-class="fadeIn animated">
      <!-- <div class="mn-landPage__item-wrapper" v-if="flag"> -->
      <div class="mn-landPage__item" v-if="flag">
        <slot></slot>
      </div>
      <!-- </div> -->
    </transition>

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
    padding: 100px 20px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
