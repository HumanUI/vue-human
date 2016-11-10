<template>
  <div class="section">
    <mn-card>
      <mn-card-item>Read only rate component. Support for half-star.</mn-card-item>
      <mn-card-item>
        <mn-rate :default="3.5" disable></mn-rate>
        <mn-rate :default="5" disable></mn-rate>
      </mn-card-item>
    </mn-card>
    <mn-card>
      <mn-card-item>Clickable rate</mn-card-item>
      <mn-card-item>
        <mn-rate></mn-rate>
        <mn-rate
          color="rgb(255, 45, 85)"
          :default="3.5"
          @change="show"
          @select="select"
          ></mn-rate>
      </mn-card-item>
    </mn-card>
  </div>
</template>

<script>
  export default {
    methods: {
      show: function (val) {
        console.log(val)
      },
      select: function (val) {
        console.log('selected: ', val)
      }
    }
  }
</script>
