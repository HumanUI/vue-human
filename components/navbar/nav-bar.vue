<template>
  <div :class="[`${cssPrefix}nav-bar`]">
    <div :class="[`${cssPrefix}nav-bar-left`]">
      <slot name="left"></slot>
    </div>
    <h1 v-if="$slots.title">
      <mn-icon name="load-a" spin v-if="loading"></mn-icon>
      <slot name="title"></slot>
    </h1>
    <div :class="[`${cssPrefix}nav-bar-center`]" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div :class="[`${cssPrefix}nav-bar-right`]">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      cssPrefix () {
        return this.$human.cssPrefix
      }
    }
  }
</script>