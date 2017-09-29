<template>
  <div class="mn-select-list-picker" @click="onClick">
    <div v-if="multiple">multiple</div>
    <span v-else>{{display}}</span>
    <mn-icon :name="icons.arrowDown"></mn-icon>
  </div>
</template>

<script>
import Element from '../../utils/Element'
export default new Element({
  name: 'mn-select-list-picker',
  props: {
    options: {
      type: Array
    },
    value: {
      type: [String, Number]
    },
    searchable: {
      type: Boolean
    },
    multiple: {
      type: Boolean
    }
  },
  data () {
    return {
      icons: {
        arrowDown: require('vue-human-icons/js/ios/arrow-down')
      }
    }
  },
  computed: {
    display () {
      return this.options.filter(option => {
        return option.value === this.value
      })[0].label
    }
  },
  methods: {
    onClick (event) {
      const config = {
        searchable: this.searchable || false,
        multiple: this.multiple || false
      }
      this.$emit('openSelect', config)
    }
  }
})
</script>

<style lang="scss">
.mn-select-list-picker {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
