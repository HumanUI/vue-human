<template>
  <page>
    <mn-landPage style="background-color: #dbfffa" turnPageBtn pageNumber >
      <!-- 
      <mn-landPage-item :itemIndex='0'>
        <div class="mn-landPage__item-wrapper"></div>
      </mn-landPage-item>
      <mn-landPage-item :itemIndex='1'>This is 2 item.</mn-landPage-item>
      <mn-landPage-item :itemIndex='2'>This is 3 item.</mn-landPage-item>
      <mn-landPage-item :itemIndex='3'>This is 4 item.</mn-landPage-item> 
      -->
      <mn-landPage-item v-for="index in 5" :key="index" :itemIndex='index - 1'>
        <div class="mn-landPage__item-wrapper">
          This is {{index}} item.
        </div>
      </mn-landPage-item>
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
.mn-landPage__item-wrapper {
  padding: 20px;
  width: 100%;
  height: 100%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  color: #303133;  
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
