import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

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
const functions = firebase.functions()

export {db, functions, firebase}
