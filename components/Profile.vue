<template>
  <div class="profile">
    <h1>{{ msg }}</h1>
    <img :src="getImgUrl()" :alt="imgDefault" width="300" height="300">
    <br><br>
    <h4>Spotusfy Username: {{ username }}</h4>
    <h4>Spotify Display Name: {{ name }}</h4>
    <h4>Email: {{ email }}</h4>
    <EditUsername v-if="showModal" />
    <b-button v-b-modal.username-modal pill variant="success" @click="doShowModal">
      Edit Username
    </b-button>
  </div>
</template>

<script>

import EditUsername from './EditUsername'
import { spotify } from '~/plugins/spotify'

export default {
  name: 'Profile',
  components: { EditUsername },
  data () {
    return {
      msg: 'Welcome',
      username: '',
      name: '',
      email: '',
      imgURL: 'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg',
      imgDefault: '',
      showModal: false
    }
  },
  beforeMount () {
    const spotifyToken = localStorage.getItem('spotify-access-token')
    if (spotifyToken) {
      spotify.setAccessToken(spotifyToken)
      spotify.getMe().then((response) => {
        if (localStorage.getItem('username')) {
          this.username = localStorage.getItem('username')
        } else {
          this.showModal = true
        }
        this.name = response.display_name
        this.email = response.email
        if (response.images.length) {
          this.imgURL = response.images[0].url
        }
      })
    }
  },
  mounted () {
    this.username = localStorage.getItem('username')
  },
  methods: {
    doShowModal () {
      this.showModal = true
    },
    getImgUrl () {
      return this.imgURL
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .profile {
    margin-top: 60px;
  }

</style>
