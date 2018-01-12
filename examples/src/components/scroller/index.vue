<template>
  <div class="scroller-full-page" :style="handleStyle">
    <mn-scroller
    :pull-down="true"
    @touchmoveevent="handleTouchMove"
    @touchendevent="handleTouchEnd"
    :refresh-status="refreshStatus"
    >
      <div class="header" slot="header" ><span>你好</span></div>
      <ul  v-for="i in 50">{{ i }}

      </ul>
    </mn-scroller>
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
    handleTouchMove (event, childSelf, precent) {
      this.height = this.defaultHeight * precent
      // if (precent === 1) {
      //   this.asyncTask()
      // }
    },
    asyncTask () {
      const timer = setTimeout(() => {
        this.refreshStatus = true
        this.height = 0
        clearTimeout(timer)
      }, 2000)
    },
    handleTouchEnd (event, childSelf, precent) {
      if (precent < 1) {
        this.height = 0
        return
      }
      this.asyncTask()
    }
  },
  mounted () {
  }
}
</script>
<style>
html {
  overflow: hidden;
}
.scroller-full-page {
  will-change: transform;
  height: 100vh;
}
.header {
  width: 100%;
  margin-top: -120px;
  height: 120px;
}
.header span {
  text-align: center;
}
</style>

