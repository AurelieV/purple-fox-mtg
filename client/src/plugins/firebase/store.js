import { firestoreAction } from 'vuexfire'

export const UPDATE_USER_ACTION = 'Update user action'
export const RESET_USER_ACTION = 'Reset user action'

const UPDATE_UID_MUTATION = 'update user uid'
const RESET_USER_MUTATION = 'reset user'

export default function store({ db }) {
  return {
    state: {
      uid: undefined,
      user: undefined,
    },
    mutations: {
      [UPDATE_UID_MUTATION](state, uid) {
        state.uid = uid
      },
      [RESET_USER_MUTATION](state) {
        state.uid = null
        state.user = null
      },
    },
    actions: {
      [UPDATE_USER_ACTION]: firestoreAction(({ commit, bindFirestoreRef }, user) => {
        commit(UPDATE_UID_MUTATION, user.uid)
        return bindFirestoreRef('user', db.collection('users').doc(user.uid))
      }),
      [RESET_USER_ACTION]: firestoreAction(async ({ commit, unbindFirestoreRef }) => {
        await unbindFirestoreRef('user')
        commit(RESET_USER_MUTATION)
      }),
    },
  }
}
