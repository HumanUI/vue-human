<template>
  <span :class="classes">
    <i
      v-for="item in this.max"
      @mouseenter="mouseEnterEvent(item)"
      @mouseleave="mouseLeaveEvent(item)"
      @click="clickItem(item)">
      <mn-rate-item :index="item" :count="current"></mn-rate-item>
    </i>
  </span>
</template>

<script>
  export default {
    props: {
      // Provide some options.
      max: {
        type: Number,
        default: 5
      },
      // option: the quantity of the stars
      default: {
        type: Number,
        default: 0
      },
      // option: the default value of the rate
      disable: {
        type: Boolean,
        default: false
      },
      // option: is clickable or not
      color: {
        type: String,
        default: 'rgb(255, 204, 0)'
      }
      // option: The color of the stars.
    },
    data () {
      return {
        defaultClasses: this.$human.cssPrefix,
        status: -1,
        //
        // If status === -1, no default value and no selected value.
        // If status === 1, it has the default value.
        // If status === 2, it has the selected value.
        //
        current: -1,
        // Pass the data to the children component 'rate-item'
        lastSelected: -1
        // Record the last selected value for mouseLeaveEvent
      }
    },
    watch: {
      current: function (val) {
        if (val > 0) {
          this.$emit('change', val)
          // Provide function 'change' for every change of current
        }
      }
    },
    computed: {
      classes () {
        let classes = {}
        // basic class
        classes[`${this.$human.cssPrefix}rate`] = true
        // return default and now classes
        return Object.assign({}, classes)
      }
    },
    methods: {
      mouseEnterEvent: function (item) {
        if (this.disable) {
          return
        }
        this.current = item
        // If disable, readonly. If not, change the color on real time.
      },
      mouseLeaveEvent: function (item) {
        if (this.disable) {
          return
        }
        if (this.status === 1) {
          this.current = this.default
        } else if (this.status === 2) {
          this.current = this.lastSelected
        } else {
          this.current = -1
        }
        //
        // Change the current value by status.
        //
        // If disable, readonly. If not, change the color on real time.
      },
      clickItem: function (item) {
        if (this.disable) {
          return
        }
        this.status = 2
        this.current = item
        this.lastSelected = item
        // If disable, readonly. If not, change the color on real time.
        this.$emit('select', item)
        // Provide function 'select' for selecting the item
      }
    },
    mounted () {
      if (this.default > 0) {
        this.status = 1
        this.current = this.default
        // If default, show the default value.
      }
    }
  }
</script>
