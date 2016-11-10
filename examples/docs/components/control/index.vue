<template>
  <div class="section">

    <div class="letter">
      <div class="letter-body">
        <h1>Control</h1>
        <small>input, button</small>
      </div>
    </div>

    <demo-quantity-control></demo-quantity-control>

  </div>
</template>

<script>
  import DemoQuantityControl from './quantity-control'

  export default {
    components: {
      DemoQuantityControl
    }
  }
</script>
