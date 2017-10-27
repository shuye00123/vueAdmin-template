import { addRecharge, prePay } from '@/api/recharge'

const recharge = {
  state: {
    id: null
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    }
  },

  actions: {
    // 申请充值
    AddRecharge({ commit }, price) {
      return new Promise((resolve, reject) => {
        var amount = price * 100
        addRecharge(amount).then(response => {
          const resp = response.data
          commit('SET_ID', resp)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 预支付
    PrePay({ commit }, from) {
      return new Promise((resolve, reject) => {
        prePay(recharge.state.id, from).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default recharge
