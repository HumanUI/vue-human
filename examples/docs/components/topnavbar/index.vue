<template>
  <div class="section example">
    <mn-letter>
      <h1>Top nav bar</h1>
      <small>title</small>
    </mn-letter>
    <demo-topnav-bar></demo-topnav-bar>
  </div>
</template>

<script>
  import DemoTopnavBar from './topnavbar'

  export default {
    components: {
      DemoTopnavBar
    }
  }
</script>
<style scoped>
  .example{
    height: 800px;
    margin-top: 44px;
  }
</style>