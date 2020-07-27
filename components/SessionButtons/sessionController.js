import { fireDb, firestore } from '~/plugins/firebase.js'
import { spotify } from '~/plugins/spotify'

function createId () {
  const length = 4
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    )
  }
  return result
}

export async function makeId (router) {
  const hash = createId()
  const ref = fireDb.collection('sessions').doc(hash)
  const docToSave = {
    apiToken: localStorage.getItem('spotify-access-token'),
    voteCount: 0,
    host: '',
    users: [],
    playlist: [],
    timestamp: firestore.Timestamp.fromDate(new Date())
  }
  try {
    await ref.get().then((doc) => {
      if (doc.exists) {
        makeId(router)
      } else {
        ref.set(docToSave)
        router.push(`/session/${hash}`)
      }
    })
  } catch (e) { }
}

export function setHost () {
  const spotifyToken = localStorage.getItem('spotify-access-token')
  spotify.setAccessToken(spotifyToken)
  spotify.getMe().then((response) => {
    const hostUsername = response.display_name
    localStorage.setItem('host', hostUsername)
  })
}
