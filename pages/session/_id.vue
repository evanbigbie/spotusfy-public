<template>
  <div id="app">
    <div>
      <Navbar :is-host="this.session.host === this.user" />
    </div>
    <div class="flex-container">
      <div class="session">
        <currentSession />
      </div>
      <div class="queue">
        <Tablepage :session-id="$route.params.id" :session-token="session.apiToken" />
        <div />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Tablepage from '../../components/Tablepage'
import Navbar from '../../components/Navbar.vue'
import currentSession from '../../components/Session'
import Session from '../../model/Session'
import { spotify } from '~/plugins/spotify'
import { fireDb, firestore } from '~/plugins/firebase.js'
export default {
  computed: {
    ...mapState(['user_id', 'display_name']),
    ...mapGetters(['GET_USER', 'GET_DISPLAY', 'GET_HIDDEN'])
  },
  name: 'App',
  components: {
    Tablepage,
    Navbar,
    currentSession
  },
  data () {
    return {
      user: 'somesillystringthatdoesn\'tmatterthatnoonewillchooseastheirname',
      id: this.$route.params.id,
      session: {},
      sessionobject: new Session(this.$route.params.id),
      input: '',
      errors: [],
      route: this.$route.params.id,
      baseuri: 'https://api.spotify.com/v1',
      data: {
        name: this.$route.params.id,
        description: 'Description',
        public: false,
        collaborative: true
      },
      songuri: {
        uris: ['spotify:track:40shLUuowIKHOAc7pPFpky', 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh', 'spotify:track:1301WleyT98MSxVHPZCA6M']
      }
    }
  },

  async beforeCreate () {
    try {
      let displayname = ''
      let id = ''
      const gettoken = await fireDb.collection('sessions').doc(this.$route.params.id).get()
      const tokenid = gettoken.data().apiToken
      spotify.setAccessToken(tokenid)
      await spotify.getMe()
        .then(function (data) {
          console.log(data)
          displayname = data.display_name
          id = data.id
          console.log(displayname)
        }, function (err) {
          console.error(err)
        })
      this.$store.commit('SET_DISPLAY', displayname)
      this.$store.commit('SET_USERID', id)
      const name = this.route // this is the sessionid found in the URL
      const snapshot = await
      fireDb
        .collection('sessions')
        .doc(name)
        .get() // used to check if playlistid is already set
      const holder = []
      holder.push(snapshot.data().playlistid)
      let flag = true // will be used later to see if playlist already exists
      if (typeof snapshot.data().playlistid === 'undefined') {
        flag = false
      } else {
        // if item is defined this means that there is a current playlist on spotify
        holder.push(snapshot.data().playlistid)
      }
      if (flag === true) {
        // used in console developer tools:(ctrl + shift + i) google browser
        console.log('playlist already found: ' + holder[0])
      }
      if (flag === false) { // if playlist is not defined on firebase create playlist on spotify
        console.log('playlist not found! adding playlist to spotify')
        const username = this.$store.getters.GET_USER
        try {
          await spotify.createPlaylist(username, this.data, async function (err, data) {
            if (err) {
              console.error(err)
            } else {
              try {
                await fireDb
                  .collection('sessions')
                  .doc(name)
                  .update({ playlistid: data.id })
              } catch (e) {
                console.log('Create Playlist Firebase', JSON.stringify(e))
              }
            }
          })
        } catch (e) {
          console.log('Create Playlist Spotfiy', JSON.stringify(e))
        }
      }
    } catch (e) {
      console.log('Before Create', JSON.stringify(e))
    }
  },
  async mounted () {
    this.user = '' // TODO: change when user is implemented
    await fireDb.collection('sessions').doc(this.id).onSnapshot((res) => {
      if (res.data()) {
        this.session = res.data()
      } else if (this.user !== this.session.host) {
        const msg = 'Sorry, the host has left the session and you\'re redirected back the the home screen'
        window.alert(msg)
        window.location = `${location.origin}`
      }
    })
    window.onbeforeunload = (e) => {
      if (this.user === this.session.host) {
        fireDb.collection('sessions').doc(this.id).delete()
      } else {
        fireDb.collection('sessions').doc(this.id).update({
          users: firestore.FieldValue.arrayRemove(this.user)
        })
      }
    }
  }
}
</script>
<style>
  .flex-container{
    display: flex;
    flex-wrap: wrap;
  }
  .flex-container .queue{
    width: 90% !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }.flex-container .search{
     width: 40% !important;
     margin-left: auto !important;
     margin-right: auto !important;
   }
  h4{
    color: white;
  }
  h5{
    color: white;
  }
  tr:nth-child(even) {background-color: RGB(75,75,75)
  ;}
  tr:nth-child(odd) {background-color: RGB(69,66,65)
  ;}
</style>
