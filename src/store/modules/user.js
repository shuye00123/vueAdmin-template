import { login, wxlogin, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    balance: 0,
    type: '',
    roles: [],
    source: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_BALANCE: (state, balance) => {
      state.balance = balance
    },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_FROM: (state, source) => {
      state.source = source
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      function loginRespHandler(userInfo, response, resolve) {
        const resp = response.data
        setToken(resp)
        commit('SET_TOKEN', resp)
        commit('SET_FROM', userInfo.from)
        resolve(response)
      }

      if (userInfo.from === 2) {
        const username = userInfo.username.trim()
        return new Promise((resolve, reject) => {
          login(username, userInfo.password, userInfo.from).then(response => {
            loginRespHandler(userInfo, response, resolve)
          }).catch(error => {
            reject(error)
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          wxlogin(userInfo.code, userInfo.from).then(response => {
            loginRespHandler(userInfo, response, resolve)
          }).catch(error => {
            reject(error)
          })
        })
      }
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_ROLES', ['admin'])
          commit('SET_NAME', data.mer_name)
          commit('SET_BALANCE', data.balance)
          commit('SET_TYPE', data.type)
          commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
