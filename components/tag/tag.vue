<template>
  <i :class="classes">
    <slot></slot>
  </i>
</template>

<script>
  export default {
    data () {
      return {
        defaultClasses: this.$human.cssPrefix
      }
    },
    computed: {
      classes () {
        let classes = {}
        // basic class
        classes[`${this.$human.cssPrefix}tag`] = true
        // type
        classes[`is-${this.type}`] = this.type
        // return default and now classes
        return Object.assign({}, classes)
      }
    },
    props: {
      // is-primary, is-secondary, is-error etc.
      type: {
        type: String
      }
    }
  }
</script>
