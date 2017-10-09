<template>
  <transition :name="transition || 'has-fade-in'">
    <div class="mn-select-list" v-if="visible" :style="{ zIndex }">
      <mn-card>
        <!-- 多选展示区 -->
        <mn-card-item v-if="multiple && selections.length>0">
          <mn-card-body>
            <span class="mn-select-list-tags">
              <mn-tag v-for="(selection,index) in selections" class="mn-select-list-tag" name="green" :key="index">{{selection.label}}
                <span class="mn-select-list-icon" @click.stop="onRemove(selection)">X</span>
              </mn-tag>
            </span>
          </mn-card-body>
        </mn-card-item>
        <!-- 搜索栏 -->
        <mn-card-item v-if="searchable">
          <mn-card-body>
            <mn-search-bar>
              <mn-input v-model="search" placeholder="请搜索"></mn-input>
            </mn-search-bar>
          </mn-card-body>
        </mn-card-item>
        <!-- 远程搜索 -->
        <div class="mn-select-list-scroller" v-if="remote">
          <!-- 未搜索到结果 -->
          <mn-card-item v-if="remoteOptions && remoteOptions.length === 0" class="mn-select-list-status">
            <mn-card-body>
              无结果
            </mn-card-body>
          </mn-card-item>
          <!-- 搜索到结果 -->
          <div v-else-if="remoteOptions && remoteOptions.length > 0">
            <mn-card-item :class="['mn-select-list-item',getItemClass(option)]" v-for="(option, index) in remoteOptions" :key="index" @click="onSelect(option)">
              <mn-card-body>
                {{option.label}}
              </mn-card-body>
            </mn-card-item>
          </div>
          <!-- 搜索中 -->
          <mn-card-item v-else-if="search" class="mn-select-list-status">
            <mn-card-body>
              搜索中
              <mn-loading-icon></mn-loading-icon>
            </mn-card-body>
          </mn-card-item>
          <!-- 初始状态 -->
          <mn-card-item v-else class="mn-select-list-status">
            <mn-card-body>
              请搜索
            </mn-card-body>
          </mn-card-item>
        </div>
        <!-- 非远程搜索 -->
        <div class="mn-select-list-scroller" v-else>
          <mn-card-item :class="['mn-select-list-item',getItemClass(option)]" v-for="(option, index) in options" v-show="option.isShow" :key="index" @click="onSelect(option)">
            <mn-card-body>
              {{option.label}}
            </mn-card-body>
          </mn-card-item>
        </div>
        <!-- 多选确认区 -->
        <mn-card-item v-if="multiple">
          <mn-card-body></mn-card-body>
          <mn-card-suffix>
            <mn-btn theme="secondary-outline" @click="onCancel">取消</mn-btn>
            <mn-btn theme="primary" @click="onConfirm">确认</mn-btn>
          </mn-card-suffix>
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
import tag from 'vue-human/suites/tag'
import searchBar from 'vue-human/suites/searchBar'
import loadingIcon from '../loadingIcon'
export default new Element({
  components: {
    ...input.map(),
    ...tag.map(),
    ...searchBar.map(),
    ...loadingIcon.map()
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
      selections: [],
      remoteOptions: undefined,
      search: undefined
    }
  },
  methods: {
    whenShadeCallHiding () {
      this.hide()
    },
    confirm () {
      this.hide()
      this.$emit('confirm', this.selections)
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    onRemove (selection) {
      this.selections = this.selections.filter(item => item.value !== selection.value)
    },
    onSelect (option) {
      if (option.disable) {
        return
      }
      if (this.multiple) {
        if (this.isSelect(option)) {
          this.selections = this.selections.filter(selection => selection.value !== option.value)
        } else {
          this.selections.push(option)
        }
      } else {
        this.selections = [option]
        this.confirm()
      }
    },
    onConfirm () {
      this.confirm()
    },
    onCancel () {
      this.cancel()
    },
    isSelect (option) {
      return this.selections.filter(selection => selection.value === option.value).length > 0
    },
    getItemClass (option) {
      let className = ['mn-select-list-item']
      const isSelect = this.isSelect(option)
      if (isSelect) {
        className.push('is-select')
      }
      if (option.disable) {
        className.push('disable')
      }
      return className
    }
  },
  watch: {
    search () {
      if (this.remote) {
        this.remoteOptions = undefined
        if (this.search !== undefined) {
          this.remoteMethod(this.search)
            .then(options => {
              this.remoteOptions = options
            })
        }
      } else {
        if (this.search === undefined) {
          this.options = this.options.map(option => {
            option.isShow = true
            return option
          })
        } else {
          this.options = this.options.map(option => {
            option.isShow = option.label.includes(this.search)
            return option
          })
        }
      }
    }
  },
  created () {
    this.selections = this.options.filter(option => {
      if (this.multiple) {
        return this.value.includes(option.value)
      } else {
        return option.value === this.value
      }
    })
    this.options = this.options.map(option => {
      option.isShow = true
      return option
    })
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
  transform: translateY(-50%);
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
  @include min-screen(tablet) {
    width: 600px;
    right: auto;
    left: 50%;
    margin-left: -300px;
  }
  .mn-card {
    margin-bottom: 0;
    .mn-select-list-scroller {
      height: 300px;
      overflow: auto;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      .mn-select-list-item {
        cursor: pointer;
        &:hover {
          background-color: #e4e8f1;
        }
        &.is-select {
          background-color: $green;
          color: white;
        }
        &.is-select:hover {
          opacity: 0.7;
        }
        &.disable {
          cursor: not-allowed;
          color: #bbb;
        }
      }
      .mn-select-list-status {
        text-align: center;
        height: 100%;
      }
    }
  }
}
</style>
