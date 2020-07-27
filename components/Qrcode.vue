<template>
  <div class="form-group">
    <qrcode-vue :value="url" :size="size" level="H" />
    <div class="row">
      <input id="toCopy" :value="url">
      <button @click="copyText">
        Copy
      </button>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  components: {
    QrcodeVue
    // VueClipboard
  },
  data () {
    return {
      url: window.location.href,
      size: 300
    }
  },
  methods: {
    handleCopyStatus (status) {
      this.copySucceeded = status
    },
    copyText () {
      const toCopyText = document.querySelector('#toCopy')
      toCopyText.setAttribute('type', 'text')
      toCopyText.select()
      try {
        const successful = document.execCommand('copy')
        const msg = successful ? 'successful' : 'unsuccessful'
        alert('URL was copied ' + msg)
      } catch (e) {
        alert('Not copied')
      }
    }
  }
}
</script>
