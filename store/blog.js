export const state = () => ({
  title: '鲁攀的个人博客',
  skin: {
    class: 'default',
    icon: 'moon'
  } // 皮肤
})

export const mutations = {
  setTitle(state, title) {
    state.title = title
  },
  switchSkin(state) {
    if (state.skin.class === 'default') {
      state.skin = {
        class: 'theme--night',
        icon: 'sun'
      }
    } else {
      state.skin = {
        class: 'default',
        icon: 'moon'
      }
    }
  }
}