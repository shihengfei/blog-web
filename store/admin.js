export const state = () => ({
  isCollapse: true
})

export const mutations = {
  switchCollapse(state) {
    state.isCollapse = !state.isCollapse
  }
}