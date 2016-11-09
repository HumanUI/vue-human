<template>
  <div class="section"> 
    <mn-card>
      <mn-card-item>
        <div class="topnavbox">
          <mn-top-nav-bar :title="title" btnshow @btnclick="dosomething">
            <span slot="backText">{{backText}}</sapn>
          </mn-top-nav-bar>
        </div>
      </mn-card-item>
    </mn-card>
  </div>
</template>
  
<script>
  export default {
    data () {
      return {
        title: 'the title',
        backText: '返回'
      }
    },
    methods: {
      dosomething () {
        console.log(this.$el)
        console.log('hi')
      }
    }
  }
</script>
<style scoped>
  .topnavbox{
    position: relative;
    height: 44px;
  }
</style>