<template>
  <mn-card>
    <mn-card-item>Quantity Control</mn-card-item>
    <mn-card-item>
      <mn-quantity-control :min="3" :max="16" @change="change" :step="2"></mn-quantity-control>
    </mn-card-item>
  </mn-card>
</template>

<script>
  export default {
    methods: {
      change: function (value) {
        console.log(value)
      }
    }
  }
</script>
