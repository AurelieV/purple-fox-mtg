import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import authStore, { UPDATE_USER_ACTION, RESET_USER_ACTION } from './store'
import Authentification from './auth'

export default {
  install(Vue, { store, openIdConfig, firebaseConfig, client }) {
    firebase.initializeApp(firebaseConfig)
    const firebaseAuth = firebase.auth()
    const db = firebase.firestore()

    store.registerModule('auth', authStore({ db }))
    const auth = new Authentification({ firebaseAuth, openIdConfig, client })
    Vue.prototype.$auth = auth
    firebaseAuth.onAuthStateChanged(async user => {
      if (!user) {
        store.dispatch(RESET_USER_ACTION)
      } else {
        store.dispatch(UPDATE_USER_ACTION, user)
      }
    })

    auth.isInit = new Promise(resolve => {
      const unwatch = store.watch(
        state => state.auth.user,
        user => {
          if (user !== undefined) {
            resolve()
            unwatch()
          }
        }
      )
    })
  },
}
