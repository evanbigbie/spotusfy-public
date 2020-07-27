<template>
  <div>
    <b-modal
      id="join-modal"
      ref="modal"
      title="Join a Session"
      ok-variant="success"
      ok-title="Go"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="sessionState"
          :invalid-feedback="error"
        >
          <b-form-input
            id="session-input"
            v-model="session"
            :state="sessionState"
            placeholder="Session ID"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'JoinModal',

  data () {
    return {
      session: '',
      sessionState: null,
      error: null
    }
  },

  methods: {
    validateSession () {
      this.error = null
      if (!this.$refs.form.checkValidity()) {
        this.error = 'Please enter a session ID'
      } else if (this.session.length !== 4) {
        this.error = 'The session ID should be 4 characters'
      }
      if (this.error) {
        this.sessionState = false
        return false
      }
      return true
    },

    resetModal () {
      this.session = ''
      this.sessionState = null
    },

    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },

    handleSubmit () {
      if (!this.validateSession()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('join-modal')
      })
      this.$router.push(`/session/${this.session}`)
    }
  }
}
</script>
