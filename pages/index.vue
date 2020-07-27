<template>
  <div id="app">
    <div id="nav">
      <navbar />
    </div>
    <div class="container">
      <div class="info">
        <info-block />
      </div>
      <div class="spotify">
        <spotify-login-button />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import InfoBlock from '../components/InfoBlock'
import SpotifyLoginButton from '../components/SpotifyLoginButton'

export default {
  components: {
    Navbar,
    InfoBlock,
    SpotifyLoginButton
  }
}
</script>

<style scoped>
  #app {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
  }
  #nav {
    position: absolute;
    width: 100%;
    z-index: 9999;
  }
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .info {
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .spotify {
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 2%;
  }
</style>
