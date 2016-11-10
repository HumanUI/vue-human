<template>
    <mn-icon :name="setName" :style="setColor"></mn-icon>
</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        required: true
      },
      count: {
        type: Number,
        default: -1
      }
    },
    computed: {
      setColor () {
        return `color: ${this.$parent.color}`
        // Set star's color by 'this.$parent.color'
      },
      setName () {
        let isInteger = this.isInteger(this.count)
        // If integer or not.
        if (!isInteger) {
          if (this.index < Math.ceil(this.count)) {
            return 'ios-star'
          } else if (this.index === Math.ceil(this.count)) {
            return 'ios-star-half'
          }
        } else {
          if (this.index <= this.count) {
            return 'ios-star'
          }
        }
        return 'ios-star-outline'
        // Change the stars by 'this.count'
      }
    },
    methods: {
      isInteger: function (num) {
        return (typeof num === 'number') && (num % 1 === 0)
      }
    }
  }
</script>
