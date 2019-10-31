import { UserAPI } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    UserAPI.login({ username: username.trim(), password: password }).then(response => {
      const { data } = response
      commit('SET_TOKEN', data.token)
      setToken(data.token)
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      UserAPI.getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    UserAPI.logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      removeToken()
      // todo reset router
    })
  }
}

export default {
  namespaced: true, // when dispatch action ,the path need to add module registered name; ex: user/login
  state,
  mutations,
  actions
}
