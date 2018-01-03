<template>
  <div>
    <mn-carousel ref="carousel">
      <mn-carousel-item v-for="(item, index) in pictures" :key="index">
        <img :src="item.src" style="width: 100%; display: block;">
      </mn-carousel-item>
    </mn-carousel>
  </div>
</template>

<script>
  import carousel from '@humans/carousel'

  export default {
    components: Object.assign({}, carousel),
    data () {
      return {
        loop: true,
        models: {
          autoplay: false
        },
        pictures: [
          { src: 'https://ois1yok9v.qnssl.com/home-banner-1.jpg' }
        ]
      }
    },
    methods: {
      onAutoplay (autoplay) {
        this.$refs.carousel.autoplay(autoplay)
      }
    },
    mounted () {
      setTimeout(() => {
        // 异步修改图片数量，修改后重新设定 length
        this.pictures = [
          { src: 'https://ois1yok9v.qnssl.com/home-banner-1.jpg' },
          { src: 'https://ois1yok9v.qnssl.com/home-banner-2.jpg' },
          { src: 'https://ois1yok9v.qnssl.com/home-banner-3.jpg' }
        ]
        if (this.$refs.carousel) this.$refs.carousel.length = 3
      }, 2000)
    }
  }
</script>
