<template>
  <div> 
    <mn-card>
      <mn-nav-bar>
        <mn-btn slot="left" @click.native.prevent="back">
          <mn-icon name="ios-arrow-left"></mn-icon>back
        </mn-btn>
        <template slot="title">text and icon ,hide lang text</template>
        <mn-btn slot="right" @click.native.prevent="getEle()">
          share
        </mn-btn>
      </mn-nav-bar>
      <mn-nav-bar>
        <mn-btn slot="left" @click.native.prevent="back">
            <mn-icon name="ios-arrow-left"></mn-icon>
        </mn-btn>
        <template slot="title">just icon</template>
        <mn-btn slot="right" @click.native.prevent="doSomething()">
          <mn-icon name="more"></mn-icon>
        </mn-btn>
      </mn-nav-bar>
      <mn-nav-bar loading>
        <mn-btn slot="left" @click.native.prevent="back">
            <mn-icon name="ios-arrow-left"></mn-icon>
        </mn-btn>
        <template slot="title">loading</template>
      </mn-nav-bar>
      <mn-nav-bar>
        <mn-btn slot="left" @click.native.prevent="back">
            <mn-icon name="ios-arrow-left"></mn-icon>
        </mn-btn>
        <mn-search-bar slot="center"></mn-search-bar>
      </mn-nav-bar>
    </mn-card>
  </div>
</template>
  
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      doSomething () {
        window.alert('hello')
      },
      getEle () {
        console.log(this.$el)
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped lang="scss">
  .card{
    padding-top: 15px;
    &>h1,&>div{
      margin-bottom: 15px;
    }
  }
</style>