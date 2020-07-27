<template>
  <div>
    <b-button v-if="!voted" ref="skipButton" :variant="!readyToSkip() ? 'warning' : 'danger'" @click="skipTrack">
      {{ !readyToSkip() ? 'Vote to skip' : 'Skip this shit...' }}
    </b-button>
    <b-button v-else ref="unSkipButton" variant="info" @click="unSkipTrack">
      Wait, Hol' up. This bumps
    </b-button>
    <div>
      Current skip count: {{ voteCount }}/{{ Math.round(voteThreshold) }}
    </div>
  </div>
</template>

<script>
import { spotify } from '~/plugins/spotify'
import { fireDb, firestore } from '~/plugins/firebase'

export default {
  props: {
    sessionId: {
      default: '',
      type: String
    },
    sessionToken: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      voteCount: 0,
      userCount: 0,
      voted: false
    }
  },

  computed: {
    voteThreshold () {
      return this.userCount * 0.5
    }
  },

  mounted () {
    fireDb.collection('sessions').doc(this.sessionId).onSnapshot((res) => {
      this.voteCount = res.data().voteCount
      this.userCount = res.data().users.length
    }, () => {
      alert('Error getting user/vote count. Try refreshing the page.')
    })
  },

  methods: {
    skipTrack () {
      spotify.setAccessToken(this.sessionToken)
      if (this.canSkip()) {
        spotify.skipToNext().then((res) => {
          fireDb.collection('sessions').doc(this.sessionId).update({ voteCount: 0 })
        }, () => {
          alert('Error skipping track. Try refreshing the page.')
        })
      } else {
        this.toggleButton()
        fireDb.collection('sessions').doc(this.sessionId).update({ voteCount: firestore.FieldValue.increment(1) })
      }
    },

    unSkipTrack () {
      fireDb.collection('sessions').doc(this.sessionId).update({ voteCount: firestore.FieldValue.increment(-1) })
      this.toggleButton()
    },

    canSkip () {
      return this.voteCount + 1 >= this.voteThreshold
    },

    readyToSkip () {
      return this.voteCount === Math.round(this.voteThreshold - 1)
    },

    toggleButton () {
      this.voted = !this.voted
    }
  }
}
</script>
