<template>
  <div>
    <b-modal
      id="username-modal"
      ref="username-modal"
      visible
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      ok-only
      no-stacking
      title="Enter a Username"
      ok-variant="success"
      ok-title="Submit"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleUsernameOK"
    >
      <form ref="form" @submit.stop.prevent="handleUsernameSubmit">
        <b-form-group
          :state="usernameState"
          :invalid-feedback="error"
        >
          <b-form-input
            id="username-modal-input"
            v-model="visitorUsername"
            :state="usernameState"
            placeholder="Enter a Username"
            type="text"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { fireDb } from '../plugins/firebase'

export default {
  name: 'EditUsername',

  data () {
    return {
      visitorUsername: '',
      newUsername: '',
      usernameState: null,
      error: null,
      users: [{
        user: 'dummy'
      }]
    }
  },

  mounted () {
    if (window.location.pathname.substring(1, 2) === 's') {
      const ref = fireDb.collection('sessions').doc(window.location.pathname.substring(9))
      ref.get().then((doc) => {
        for (let n = 0; n < doc.get('users').length; n++) {
          this.users.push({
            user: doc.get('users')[n]
          })
        }
      })
    }
  },

  methods: {
    resetModal () {
      this.newUsername = ''
      this.visitorUsername = ''
      this.usernameState = null
    },
    handleUsernameOK (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleUsernameSubmit()
    },
    handleUsernameSubmit () {
      if (!this.validateUsername()) {
        return
      }
      this.$nextTick(() => {
        if (window.location.pathname.substring(1, 2) === 'h') {
          localStorage.setItem('username', this.visitorUsername)
          this.$bvModal.hide('username-modal')
          window.location.reload()
        } else {
          const existingUsername = localStorage.getItem('username')
          localStorage.setItem('username', this.visitorUsername)
          const hash = window.location.pathname.substring(9)
          const ref = fireDb.collection('sessions').doc(hash)
          try {
            ref.get().then((doc) => {
              for (let n = 0; n < doc.get('users').length; n++) {
                if (existingUsername === doc.get('users')[n]) {
                  this.users.splice(n, 1)
                  this.users.push({
                    user: this.visitorUsername
                  })
                }
              }
            })
            this.$bvModal.hide('username-modal')
          } catch (e) {
          }
          this.$bvModal.hide('username-modal')
        }
      })
    },
    validateUsername () {
      this.error = null
      if (this.checkSession()) {
        this.error = 'Username already exists in the session, please choose a new one'
      } else if (!this.$refs.form.checkValidity()) {
        this.error = 'Please enter a username'
      } else if (this.visitorUsername.length < 3) {
        this.error = 'Please enter a username of length 3 or more'
      } else if (this.visitorUsername === localStorage.getItem('username')) {
        this.error = 'Provided username is identical to existing username'
      }
      if (this.error) {
        this.usernameState = false
        return false
      } else {
        return true
      }
    },
    checkSession () {
      for (let n = 1; n < this.users.length; n++) {
        if (this.visitorUsername === this.users[n].user) {
          return true
        }
      }
      return false
    }
  }
}

</script>
