<template>
  <transition :name="transition || 'has-slide-in-bottom'">
    <div class="mn-select-list" v-if="visible" :style="{ zIndex }">
      <mn-card v-if="_options">
        <mn-card-item v-if="searchable">
          <mn-card-body>
            <mn-search-bar>
              <mn-input v-model="search" placeholder="请搜索"></mn-input>
            </mn-search-bar>
          </mn-card-body>
        </mn-card-item>
        <div v-if="_options.length > 0">
          <mn-card-item v-for="(option, index) in _options" :key="`value${option.value}index${index}`" @click="onSelect(option)" :class="option.isSelected ? 'is-selected item' : 'item'">
            <mn-card-body>
              {{option.label}}
            </mn-card-body>
          </mn-card-item>
        </div>
        <mn-card-item v-else class="no-result">
          <mn-card-body>
            无匹配结果
          </mn-card-body>
        </mn-card-item>
      </mn-card>
    </div>
  </transition>
</template>

<script>
import Element from '../../utils/Element'
import layerMixin from '../layer/layerMixin'
import shadeMixin from '../layer/shadeMixin'
import input from 'vue-human/suites/input'
import searchBar from 'vue-human/suites/searchBar'
export default new Element({
  components: {
    ...input.map(),
    ...searchBar.map()
  },
  mixins: [
    layerMixin,
    shadeMixin
  ],
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
      _options: undefined,
      search: undefined
    }
  },
  methods: {
    onCancel () {
      this.hide()
      this.$emit('cancel')
    },
    whenShadeCallHiding () {
      this.onCancel()
    },
    onSelect (option) {
      this.hide()
      this.$emit('confirm', option)
    },
    initOptions () {
      this._options = this.options.map(option => {
        option.isSelected = option.value === this.value
        return option
      })
    }
  },
  watch: {
    search () {
      if (this.search !== undefined) {
        this._options = this.options.filter(option => {
          option.isSelected = option.value === this.value
          return option.label.includes(this.search)
        })
      } else {
        this.initOptions()
      }
    }
  },
  created () {
    this.initOptions()
  }
})
</script>

<style lang="scss">
@import "../../scss/mixins/media";
@import "../../scss/vars.scss";
.mn-select-list {
  position: fixed;
  top: 50%;
  right: 0.5rem;
  left: 0.5rem;
  height: 240px;
  margin-top: -120px;

  @include min-screen(tablet) {
    width: 400px;
    right: auto;
    left: 50%;
    margin-left: -200px;
  }
  .item {
    cursor: pointer;
    &:hover {
      background-color: $gray-darkest;
    }
    &.is-selected {
      background-color: $green;
      color: white;
    }
  }
  .no-result {
    text-align: center;
  }
}
</style>
