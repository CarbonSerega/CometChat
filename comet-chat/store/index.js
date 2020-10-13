export const state = () => ({
  user: {},
  users: [],
  messages: []
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },

  clearData(state) {
    state.user = {}
    state.users = []
    state.messages = []
  },

  SOCKET_newMsg(state, msg) {
    state.messages.push(msg)
  },

  SOCKET_updateUsers(state, users) {
    state.users = users
  }
}
