import { fireDb } from '~/plugins/firebase'
class Queue {
  // track: {track_id, track_title, track_artist, track_album}
  // userID: "johndoe"
  // playlist = [
  //  track:{..},
  //  userID
  // ]
  constructor () {
    this.oplaylist = []
    this.localsession = ''
  }

  async getdbQueue (sessionID) {
    const snapshot = await fireDb.collection('sessions').doc(sessionID).get()
    this.oplaylist = []
    const db = []
    db.push(snapshot.data())
    console.log(db[0].playlist)
    if (db[0].playlist.length !== 0) {
      db[0].playlist.forEach((item) => {
        this.oplaylist.push({
          time: item.time,
          track: {
            album_name: item.track.album_name,
            artist_name: item.track.artist_name,
            track_name: item.track.track_name,
            uri: item.track.uri,
            url: item.track.url
          },
          uid: item.uid
        })
      })
    } else {
      this.oplaylist = []
    }
  }

  async addPlaylist (sessionID, userID, track) {
    const timestamp = Math.floor((new Date()).getTime() / 1000)
    await this.getdbQueue(sessionID)
    this.oplaylist.push({ uid: userID, track, time: timestamp })
    // add to database
    await fireDb.collection('sessions').doc(sessionID).update({ playlist: this.oplaylist })
    // add to spotify playlist
  }

  getPlaylist () {
    return this.playlist
  }
}
export default Queue
