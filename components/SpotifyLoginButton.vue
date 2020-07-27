<template>
  <b-button id="spotifyLogin" pill @click="redirectToSpotify">
    Connect with Spotify
  </b-button>
</template>

<script>
export default {
  methods: {
    redirectToSpotify () {
      const clientId = '944d6c120afe41179ddcf4c1d9a874b2'
      const redirectUri = encodeURIComponent(`${location.origin}/callback/`)
      const scopes = ['streaming', 'playlist-modify-public', 'playlist-modify-private ', 'user-read-private', 'user-read-email']
      let uri = 'https://accounts.spotify.com/authorize'
      uri += `?client_id=${clientId}`
      uri += `&redirect_uri=${redirectUri}`
      uri += '&response_type=token'
      uri += `&scope=${scopes.join('+')}`
      window.location = uri
    }
  }
}
</script>

<style scoped>
  #spotifyLogin {
    z-index: -1;
    margin-left: auto;
    margin-right: auto;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 24px;
    padding-right: 24px;
    left: 0;
    right: 0;
    font-size: 21px;
    font-weight: 700;
    background-color: rgb(29, 185, 84);
    color: white;
    border-color: transparent;
  }
  #spotifyLogin:hover {
    background-color: rgb(30, 211, 93);
  }
</style>
