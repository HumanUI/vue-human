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
    @click="btnclick"><mn-icon name="more"></mn-icon></button>
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
      btnclick () {
        this.$emit('btnclick')
      }
    }
  }
</script>