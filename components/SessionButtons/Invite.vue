<template>
  <div>
    <b-modal
      id="modal-prevent-closing-invite"
      ref="modal"
      title="Invite an user"
      ok-variant="success"
      ok-title="Go"
    >
      <div class="ml-auto">
        <label> Scan this QR Code for the URL </label>
        <QRCode />
      </div>
    </b-modal>
  </div>
</template>

<script>
import QRCode from '../Qrcode'
export default {
  name: 'InviteButton',
  components: {
    QRCode
  }
}
</script>
