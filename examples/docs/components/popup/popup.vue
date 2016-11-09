<template>
  <mn-popup :show="show" animation="slideInDown" @close="cancel">
    <mn-card class="m-b-1">
      <mn-card-item>
        <div class="is-center-text">
          <small>This photo will be deleted from iCloud Photo Library on all your devices.</small>
        </div>
      </mn-card-item>
      <mn-card-btns>
        <button class="is-red-text">Delete Photo</button>
      </mn-card-btns>
    </mn-card>
    <mn-card class="m-b-0">
      <mn-card-btns>
        <button class="is-blue-text" @click="cancel"><strong>Cancel</strong></button>
      </mn-card-btns>
    </mn-card>
  </mn-popup>
</template>
<script>
  export default {
    methods: {
      cancel () {
        this.show = false
      }
    },
    data () {
      return {
        show: false
      }
    },
    mounted () {
      this.show = true
    }
  }
</script>
