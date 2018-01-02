<template>
  <page>
    <mn-landPage :turnPageBtn='true'>
      <mn-landPage-item :itemIndex='0'>This is 1 item.</mn-landPage-item>
      <mn-landPage-item :itemIndex='1'>This is 2 item.</mn-landPage-item>
      <mn-landPage-item :itemIndex='2'>This is 3 item.</mn-landPage-item>
      <mn-landPage-item :itemIndex='3'>This is 4 item.</mn-landPage-item>
    </mn-landPage>
  </page>
</template>

<script>
import landPage from 'vue-human/suites/landPage'
export default {
  components: {
    ...landPage.map()
  }
}
</script>

<style>

</style>
