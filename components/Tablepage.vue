<template>
  <div>
    <div class="queue">
      <table class="table">
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">
              <h4 style="color: RGB(30,215,96);">
                <small> {{ column }}</small>
              </h4>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="(column, indexColumn) in columns" :key="indexColumn">
              <h5 v-if="column==='No.'">
                <small>{{ index +1 }}</small>
              </h5>
              <h5 v-if="column!='Album Cover'">
                <small>{{ item[column] }}</small>
              </h5>
              <img v-if="column=== 'Album Cover'" class="rounded-corners" :src="item['Album Cover'].valueOf()" style="width:75px;height:75px;">
              <b-button v-if="item['User'].valueOf() === GET_DISPLAY && column ==='Controls'" variant="danger" @click="removeElement (index)">
                Remove
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
       <playlist-navigation :session-id="sessionId" :session-token="sessionToken" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fireDb } from '../plugins/firebase'
import { spotify } from '~/plugins/spotify'
import PlaylistNavigation from '~/components/PlaylistNavigation'
export default {
  computed: {
    ...mapGetters(['GET_USER', 'GET_DISPLAY'])
  },
  components: {
    PlaylistNavigation
  },
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
      count: 0,
      isHidden: false,
      optQuality: [
        { value: 1, text: 'Original' },
        { value: 2, text: 'Kw-1' },
        { value: 3, text: 'Kw-2' }
      ],
      db: [],
      songs: [],
      queue: [],
      items: [],
      columns: ['No.', 'User', 'Album Cover', 'Album', 'Song', 'Artist', 'Controls'],
      slcQuality: null,
      user: 'bob'
    }
  },
  async mounted () {
    try {
      const sessionref = fireDb.collection('sessions')
      const names = this.$route.params.id
      await sessionref.doc(names).onSnapshot((data) => {
        this.db = []
        this.songs = []
        this.queue = []
        this.items = []
        this.db.push(data.data())
        console.log()
        if (typeof this.db[0].playlist !== 'undefined') {
          this.db[0].playlist.forEach((item) => {
            this.songs.push(item)
          })
        }
        if (this.songs.length !== 0) {
          this.songs.forEach((item) => {
            this.items.push({
              User: item.uid,
              Album: item.track.album_name,
              Song: item.track.track_name,
              'Album Cover': item.track.url,
              Artist: item.track.artist_name
            })
          })
        }
      })
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  },
  methods: {
    async removeElement (index) {
      try {
        const playlistholder = []
        const name = this.$route.params.id
        const snapshot1 = await
        fireDb.collection('sessions').doc(this.$route.params.id).get() // used to check if playlistid is already set
        const holder = []
        let flag = true
        if (typeof snapshot1.data().playlistid === 'undefined') {
          flag = false
        } else {
          holder.push(snapshot1.data().playlistid)
        }
        if (flag === false) {
          console.log('Playlist Undefined')
        } else {
          console.log('Playlist defined processing... Delete')
        }
        const snapshot = await fireDb.collection('sessions').doc(this.$route.params.id).get()
        playlistholder.push(snapshot.data())
        console.log(playlistholder[0].playlist)
        const newArray = playlistholder[0].playlist.splice()
        let removeuri = ''
        let removeindex = -1
        console.log('new Array')
        console.log(newArray)
        const userid = this.$store.getters.GET_DISPLAY
        for (let i = 0; i < playlistholder[0].playlist.length; i++) {
          if (playlistholder[0].playlist[i].uid === userid && i === index) {
            removeindex = i
            removeuri = playlistholder[0].playlist[i].track.uri
          }
        }
        playlistholder[0].playlist.splice(removeindex, 1)
        console.log(playlistholder[0])
        const gettoken = await fireDb.collection('sessions').doc(this.$route.params.id).get()
        const tokenid = gettoken.data().apiToken
        spotify.setAccessToken(tokenid)
        await spotify.removeTracksFromPlaylist(holder[0].toString(), [{
          uri: removeuri,
          positions: [removeindex]
        }], async function (err, data) {
          if (err) {
            console.error(err)
          } else {
            const oplaylist = []
            for (let i = 0; i < playlistholder[0].playlist.length; i++) {
              oplaylist.push(playlistholder[0].playlist[i])
            }
            console.log(oplaylist)
            try {
              await fireDb.collection('sessions').doc(name).update({ playlist: oplaylist })
            } catch (e) {
              console.log('FAILURE To Make Playlist', JSON.stringify(e))
            }
          }
        })
      } catch (e) {
        console.log('TABLE PAGE ERROR:', JSON.stringify(e))
      }
    }

  }

}
</script>
<style>
  img.rounded-corners {
    border-radius: 20px;
  }
</style>
