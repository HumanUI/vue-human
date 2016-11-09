<template>
  <div class='topnav-bar'>
    <div class="topnav-bar-back">
      <slot name="back"></slot>
    </div>
    <h4>{{title}}</h4>
    <div class="topnav-bar-button">
      <slot name="btn"></slot>
    </div>
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
      }
    },
    methods: {
    }
  }
</script>