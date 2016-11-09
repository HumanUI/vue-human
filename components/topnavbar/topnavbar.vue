<template>
  <div class='topnav-bar'>
    <a @click="routergo">
      <mn-icon name='ios-arrow-left'></mn-icon>
      <slot name="backText"></slot></a>
    <h4>{{title}}</h4>
    <button
    v-if="btnshow"
    type="button"
    class="topnav-bar-button"
    @click="button"><mn-icon name="ios-settings-strong"></mn-icon></button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      btnshow: {
        type: Boolean,
        rdefault: false
      }
    },
    methods: {
      routergo () {
        this.$router.go(-1)
      },
      button () {
        this.$emit('click')
      }
    }
  }
</script>