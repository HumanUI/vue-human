<template>
  <page>
    <mn-letter>
      <mn-letter-body><h1>Message</h1></mn-letter-body>
    </mn-letter>

    <mn-section>
      <mn-card>
        <mn-card-item>
          <mn-card-body>Message</mn-card-body>
          <mn-card-suffix action>
            <mn-btn theme="primary" @click="onOpenMessage" size="sm">
              Open message
            </mn-btn>
          </mn-card-suffix>
        </mn-card-item>
      </mn-card>
      <mn-section-note>
        可以有多种不同类型的 Message: success, warning, error。
      </mn-section-note>
    </mn-section>
  </page>
</template>

<script>
  import Message from 'vue-human/utils/Message'
  export default {
    data () {
      return {
        types: ['Default', 'Success', 'Warning', 'Error']
      }
    },
    methods: {
      onOpenMessage () {
        this.messageLayer = Message.create().show()
      }
    },
    beforeDestroy () {
      if (this.messageLayer) this.messageLayer.destroy()
    }
  }
</script>
