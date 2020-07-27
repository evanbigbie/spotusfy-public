<template>
  <div>
    <b-modal
      id="modal-prevent-closing-leave"
      ref="modal"
      title="Leave Session?"
      ok-variant="success"
      ok-title="Yes"
      @ok="handleSubmit"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :invalid-feedback="error"
        >
          <p> Are you sure you want to leave? </p>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'LeaveModal',

  props: {
    isHost: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      session: '',
      flag: false,
      sessionState: null,
      error: null
    }
  },

  methods: {
    handleSubmit () {
      window.location = `${location.origin}/${this.isHost ? 'home' : ''}`
    }
  }
}
</script>
