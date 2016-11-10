<template>
  <div> 
    <mn-card>
      <mn-card-item>
          <mn-top-nav-bar title="文字加图标,过长会隐藏">
            <router-link to="/" slot="back">
               <mn-btn >
                 <mn-icon name="ios-arrow-left"></mn-icon>返回
               </mn-btn>
            </router-link>
            <mn-btn slot="btn">
              分享
            </mn-btn>
          </mn-top-nav-bar>
      </mn-card-item>
      <mn-card-item>
          <mn-top-nav-bar title="纯图标">
            <router-link to="/" slot="back">
               <mn-btn >
                 <mn-icon name="ios-arrow-left"></mn-icon>
               </mn-btn>
            </router-link>
            <mn-btn slot="btn" @click.native.prevent="dosomething()">
              <mn-icon name="more"></mn-icon>
            </mn-btn>
          </mn-top-nav-bar>
      </mn-card-item>
      <mn-card-item>
          <mn-top-nav-bar title="只有返回">
            <router-link to="/" slot="back">
               <mn-btn >
                 <mn-icon name="ios-arrow-left"></mn-icon>
               </mn-btn>
            </router-link>
          </mn-top-nav-bar>
      </mn-card-item>
      <mn-card-item>
          <mn-top-nav-bar title="固定在顶部" fixed>
            <router-link to="/" slot="back">
               <mn-btn >
                 <mn-icon name="ios-arrow-left"></mn-icon>
               </mn-btn>
            </router-link>
            <mn-btn slot="btn">
              <mn-icon name="more"></mn-icon>
            </mn-btn>
          </mn-top-nav-bar>
      </mn-card-item>
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
      dosomething () {
        window.alert('hello')
      }
    }
  }
</script>
<style scoped>
</style>