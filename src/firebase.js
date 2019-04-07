import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAJ5ZyS4o5mXUFJXULwXemW7YvBrlyQL-o',
  authDomain: 'airbnb-dmyk.firebaseapp.com',
  databaseURL: 'https://airbnb-dmyk.firebaseio.com',
  projectId: 'airbnb-dmyk',
  storageBucket: 'airbnb-dmyk.appspot.com',
  messagingSenderId: '428207500984',
}

firebase.initializeApp(config)
const db = firebase.firestore()

export {db}
