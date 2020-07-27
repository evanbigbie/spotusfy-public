import Queue from './Queue'
import { fireDb } from '~/plugins/firebase.js'

class Session {
  currentQueue = new Queue()
  constructor (createdSession) {
    this.sessionID = createdSession
    this.users = []
  }

  async addUser (userID) {
    // added to array
    this.users.push({ No: this.users.length, user: userID })
    // need to add to database here
    await fireDb.collection('sessions').doc(this.sessionID).update({ users: this.users })
  }

  deleteUser (userID) {
    print('delete')
  }

  // track: {track_id, track_title, track_artist, track_album}
  async addtoQueue (userID, track) {
    await this.currentQueue.addPlaylist(this.sessionID, userID, track)
  }
}
export default Session
