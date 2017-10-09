<template>
  <div @click="onClick">
    <span v-if="multiple" :class="getPickerClass">
      <span class="mn-select-list-tags">
        <mn-tag v-for="(selection,index) in selections" class="mn-select-list-tag" name="green" :key="index">{{selection.label}}
          <span class="mn-select-list-icon" @click.stop="onRemove(selection)">X</span>
        </mn-tag>
        请选择
      </span>
      <mn-icon class="mn-select-list-icon" :name="icons.arrowDown"></mn-icon>
    </span>
    <span v-else :class="getPickerClass">
      <span v-if="selections.length>0">{{selections[0].label}}</span>
      <span v-else>请选择</span>
      <mn-icon class="mn-select-list-icon" :name="icons.arrowDown"></mn-icon>
    </span>
  </div>
</template>

<script>
import Element from '../../utils/Element'
import tag from 'vue-human/suites/tag'
import SelectList from '../../utils/SelectList'
export default new Element({
  name: 'mn-select-list-picker',
  components: {
    ...tag.map()
  },
  props: {
    options: {
      type: Array
    },
    value: {
      type: [String, Number, Array]
    },
    searchable: {
      type: Boolean
    },
    multiple: {
      type: Boolean
    },
    remote: {
      type: Boolean
    },
    remoteMethod: {
      type: Function
    }
  },
  data () {
    return {
      icons: {
        arrowDown: require('vue-human-icons/js/ios/arrow-down')
      },
      SelectList: undefined
    }
  },
  computed: {
    // 已选择项
    selections () {
      if (this.remote) {
        if (this.options === undefined) {
          return [{ label: '加载中...', value: undefined }]
        } else {
          return this.options.filter(option => {
            return option.value === this.value
          })
        }
      } else {
        if (this.multiple) {
          return this.options.filter(option => {
            return this.value.includes(option.value)
          })
        } else {
          return this.options.filter(option => {
            return option.value === this.value
          })
        }
      }
    },
    getPickerClass () {
      let className = ['mn-select-list-picker']
      if (this.multiple) {
        className.push('multiple')
      }
      return className
    }
  },
  methods: {
    onRemove (selection) {
      const value = this.selections.filter(item => item.value !== selection.value).map(item => item.value)
      this.$emit('update:value', value)
    },
    onClick (event) {
      this.SelectList = SelectList
        .create({
          value: this.value,
          options: this.options,
          searchable: this.searchable,
          multiple: this.multiple,
          remote: this.remote,
          remoteMethod: this.remoteMethod
        })
        .show()
        .on(
        'confirm',
        value => {
          this.$emit('update:value', value)
        })
    }
  }
})
</script>

<style lang="scss">
.mn-select-list-picker {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.multiple {
    .mn-select-list-tags {
      display: flex;
      flex-wrap: wrap;
      color: #ccc;
      .mn-select-list-tag {
        margin: 0 0.5rem 0.2rem 0;
        display: flex;
        align-items: center;
        .mn-select-list-icon {
          padding: 0 0.4rem;
          margin: 0 0.2rem;
          border-radius: 0.2rem;
          cursor: pointer;
          &:hover {
            background-color: black;
            opacity: 0.3;
          }
        }
      }
    }
  }
}
</style>
