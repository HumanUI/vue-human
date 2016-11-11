<template>
  <div> 
    <mn-card>
      <mn-top-nav-bar>
        <router-link to="/" slot="left">
          <mn-btn >
            <mn-icon name="ios-arrow-left"></mn-icon>back
          </mn-btn>
        </router-link>
        <template slot="title">text and icon ,hide lang text</template>
        <mn-btn slot="right" @click.native.prevent="getEle()">
          share
        </mn-btn>
      </mn-top-nav-bar>
      <mn-top-nav-bar>
        <router-link to="/" slot="left">
          <mn-btn >
            <mn-icon name="ios-arrow-left"></mn-icon>
          </mn-btn>
        </router-link>
        <template slot="title">just icon</template>
        <mn-btn slot="right" @click.native.prevent="doSomething()">
          <mn-icon name="more"></mn-icon>
        </mn-btn>
      </mn-top-nav-bar>
      <mn-top-nav-bar loading>
        <router-link to="/" slot="left">
          <mn-btn >
            <mn-icon name="ios-arrow-left"></mn-icon>
          </mn-btn>
        </router-link>
        <template slot="title">loading</template>
      </mn-top-nav-bar>
      <mn-top-nav-bar>
        <router-link to="/" slot="left">
          <mn-btn >
            <mn-icon name="ios-arrow-left"></mn-icon>
          </mn-btn>
        </router-link>
        <mn-search-bar slot="center"></mn-search-bar>
      </mn-top-nav-bar>
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
      }
    }
  }
</script>
<style scoped lang="scss">
  .card{
    padding-top: 15px;
    & > *{
      margin-bottom: 15px;
    }
  }
</style>