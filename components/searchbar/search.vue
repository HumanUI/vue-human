<template>
  <div :class="search">
    <div :class="searchInput">
      <mn-icon name="ios-search-strong"></mn-icon>
      <input
        type="text"
        v-bind:value="value"
        v-on:input="input"
        v-model="message"
        @focus="show = true"
        @blur="show = false"
        @keyup.enter="typying"
        placeholder="Search something">
    </div>
    <transition name="bar-search">
      <button
        :class="searchButton"
        @click="show = false"
        v-if="show"
      >cancel</button>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
        message: '',
        defaultClasses: this.$human.cssPrefix
      }
    },
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    methods: {
      typying: function () {
        this.$emit('enter')
      },
      input: function (event) {
        this.$emit('input', event.target.value)
      },
      setClass: function (name) {
        let classes = {}
        classes[`${this.defaultClasses}${name}`] = true
        return Object.assign({}, classes)
        // Add css prefix
      }
    },
    computed: {
      search () {
        return this.setClass('bar-search')
      },
      searchInput () {
        return this.setClass('bar-search-input')
      },
      searchButton () {
        return this.setClass('bar-search-button')
      }
    }
  }
</script>
