<template>
  <div>
    <h3>
      Redirecting back to Spotusfy
    </h3>
  </div>
</template>

<script>
export default {
  mounted () {
    // Creates a map of the hash returned from Spotify
    const params = {}
    location.hash.substr(1).split('&').map((k) => {
      params[k.split('=')[0]] = k.split('=')[1]
    })
    // Stores the access token
    localStorage.setItem('spotify-access-token', params.access_token)
    // Redirect to home
    window.location = `${location.origin}/home`
  }
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
