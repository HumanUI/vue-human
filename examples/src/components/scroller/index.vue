<template>
<div>
    <h1>测试</h1>
  <div class="scroller-full-page">
    <mn-scroller
    :pull-down="true"
    :scroll-container-height="500"
    @touchmoveevent="handleTouchMove"
    @touchendevent="handleTouchEnd"
    :refresh-status="refreshStatus"
    :scrollbar="false"
    :style="handleStyle"
    >
      <div class="header" slot="header" ><span>你好</span></div>
      <ul >
        <li  v-for="(i,index) in 50" :key="index" v-html="i"></li>

      </ul>
      <div class="footer" slot="footer"><span>再见</span></div>
    </mn-scroller>
  </div>

</div>
</template>

<script>
import { scroller } from '@humans/scroller'

export default {
  components: {
    ...scroller
  },
  data () {
    return {
      defaultHeight: 120,
      height: 0,
      refreshStatus: false
    }
  },
  computed: {
    handleStyle () {
      return { transform: `translate3d(0,${this.height}px,0)` }
    }
  },
  methods: {
    handleTouchMove (event, childSelf, precent, direction) {
      if (direction === 'down') {
        this.height = this.defaultHeight * precent
      }
      if (direction === 'up') {
        this.height = -this.defaultHeight * precent
      }
    },
    asyncTask () {
      const timer = setTimeout(() => {
        this.refreshStatus = true
        this.height = 0
        clearTimeout(timer)
      }, 2000)
    },
    handleTouchEnd (event, childSelf, precent, direction) {
      if (precent < 1) {
        this.height = 0
        return
      }
      this.asyncTask()
    }
  },
  mounted () {}
}
</script>
<style>
html {
  overflow: hidden;
}
h1 {
  text-align: center;
  display: block;
  font-size: 2em;
  font-weight: bold;
  position: relative;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
}
.scroller-full-page {
  will-change: transform;

}
.scroller-full-page::after {
  content: " ";
  width: 100%;
  height: 200px;
  text-align: center;
  display: block;
  font-size: 2em;
  font-weight: bold;
  position: relative;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
}
.header  {
  position: absolute;
  top: -50px;
}
.footer {
  width: 100%;
  margin-bottom: -120px;
  height: 120px;
}
</style>

