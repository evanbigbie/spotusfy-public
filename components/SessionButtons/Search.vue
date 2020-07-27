<template>
  <div>
    <input type="search" placeholder="Search...">
    <button @click="search"><i class="fa fa-search"></i>Go</button>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase'

export default {
  name: 'SearchButton',
  data () {
    return {
      qs: {
        q: 'road',
        type: 'track'
      }
    }
  },
  methods: {
    async search () {
      const reqUser = new XMLHttpRequest()
      reqUser.onreadystatechange = function () {
        if (reqUser.readyState === 4) {
          if (reqUser.status >= 200 && reqUser.status <= 300) {
            console.log('success Songs found')
            const responses = JSON.parse(reqUser.responseText)
            console.log(responses)
          } else {
            console.log('Fail! TO FIND SONGS ')
            console.log(JSON.parse(reqUser.responseText))
          }
        }
      }
      const gettoken = await fireDb.collection('sessions').doc(this.$route.params.id).get()
      const tokenid = gettoken.data().apiToken
      const url = new URL('https://api.spotify.com/v1/search')
      url.searchParams.set('q', 'hello')
      url.searchParams.set('type', 'track,album,artist')
      url.searchParams.set('limit', '10')
      reqUser.open('GET', url.toString())
      console.log(tokenid)
      reqUser.setRequestHeader('Authorization', 'Bearer ' + tokenid)
      reqUser.send()
    }
  }
}
</script>

<style scoped>

</style>
