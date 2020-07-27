<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand v-if="onIndexPage" href="/">
      Home
    </b-navbar-brand>
    <b-navbar-brand v-else href="/home">
      Home
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="onHomePage" @click="makeId">
          Create Session
        </b-nav-item>
        <b-nav-item v-if="onHomePage" v-b-modal.join-modal>
          Join Session
        </b-nav-item>
        <join-modal />
        <b-nav-item v-if="onSessionPage" v-b-modal.modal-prevent-closing-invite>
          Invite People
        </b-nav-item>
        <invite-button />
        <b-nav-item v-if="onSessionPage" v-b-modal.modal-prevent-closing-leave>
          Leave Session
        </b-nav-item>
        <leave-button :is-host="isHost" />
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="onIndexPage" right @click="spotifyLogin">
          Connect to Spotify
        </b-nav-item>
        <b-nav-item v-else right href="/" @click="logout">
          Sign Out
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

import * as sessionController from './SessionButtons/sessionController'
import JoinModal from './SessionButtons/Join'
import InviteButton from './SessionButtons/Invite'
import LeaveButton from './SessionButtons/Leave'

export default {
  name: 'EditButton',

  components: {
    JoinModal,
    InviteButton,
    LeaveButton
  },

  props: {
    isHost: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {}
  },

  computed: {
    onIndexPage () {
      return this.checkPath('')
    },
    onHomePage () {
      return this.checkPath('home')
    },
    onSessionPage () {
      return this.checkPath('session')
    }
  },

  methods: {
    logout () {
      localStorage.removeItem('spotify-access-token')
    },

    checkPath (path) {
      return this.$route.path.substr(1).split('/')[0] === path
    },

    spotifyLogin (e) {
      e.preventDefault()
      document.getElementById('spotifyLogin').click()
    },

    async makeId () {
      await sessionController.makeId(this.$router)
    }
  }
}
</script>
