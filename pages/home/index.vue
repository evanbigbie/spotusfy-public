<template>
  <div id="app">
    <navbar />
    <profile />
    <br><br>
    <session-navigation />
  </div>
</template>

<script>
import Navbar from '../../components/Navbar'
import Profile from '../../components/Profile'
import SessionNavigation from '../../components/SessionNavigation'

export default {
  components: {
    Navbar,
    Profile,
    SessionNavigation
  }
}
</script>
