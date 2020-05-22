import * as firebase from 'firebase/app'
import 'firebase/auth'

import authStore, { UPDATE_USER_ACTION } from './store'
import Authentification from './auth'

export default {
  install(Vue, { store, openIdConfig, firebaseConfig, client }) {
    firebase.initializeApp(firebaseConfig)
    const firebaseAuth = firebase.auth()
    // const firestore = firebase.firestore()

    store.registerModule('auth', authStore())
    Vue.prototype.$auth = new Authentification({ firebaseAuth, openIdConfig, client })

    firebaseAuth.onAuthStateChanged(user => {
      store.dispatch(UPDATE_USER_ACTION, user)
    })
  },
}
