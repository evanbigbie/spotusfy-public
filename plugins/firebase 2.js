import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  // Your web app's Firebase configuration
  const config = {
    apiKey: 'AIzaSyAHm0_IPhBM14vKm0km6MToejROQgcq4kI',
    authDomain: 'spotusfy.firebaseapp.com',
    databaseURL: 'https://spotusfy.firebaseio.com',
    projectId: 'spotusfy',
    storageBucket: 'spotusfy.appspot.com',
    messagingSenderId: '569183852825',
    appId: '1:569183852825:web:1c0d0de37bfe8303c80d88',
    measurementId: 'G-5G6T2XLZFE'
  }
  // Initialize Firebase
  firebase.initializeApp(config)
}

const fireDb = firebase.firestore()
export { fireDb }
