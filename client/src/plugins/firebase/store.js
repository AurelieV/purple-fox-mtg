export const UPDATE_USER_ACTION = 'updateUser'

const UPDATE_USER_MUTATION = 'update user'
const RESET_USER_MUTATION = 'reset user'

export default function store() {
  return {
    state: {
      user: undefined,
    },
    mutations: {
      [UPDATE_USER_MUTATION](state, user) {
        state.user = user
      },
      [RESET_USER_MUTATION](state) {
        state.uid = null
        state.user = null
      },
    },
    actions: {
      async [UPDATE_USER_ACTION]({ commit }, user) {
        if (user) {
          commit(UPDATE_USER_MUTATION, user)
        } else {
          commit(RESET_USER_MUTATION)
        }
      },
    },
  }
}
