export const state = () => ({
  isCollapse: true,
  token: null
})

export const mutations = {
  switchCollapse(state) {
    state.isCollapse = !state.isCollapse
  },
  setToken(state, token) {
    console.log(state, token)
    state.token = token
  }
}