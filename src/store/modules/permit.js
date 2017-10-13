import { addPermit, getRule } from '@/api/permit'

const rule = {
  state: {
    rules: [],
    reasons: []
  },

  mutations: {
    SET_RULES: (state, rules) => {
      state.rules = rules
    },
    SET_REASONS: (state, reasons) => {
      state.reasons = reasons
    }
  },

  actions: {
    // 放行
    AddPermit({ commit }, permit) {
      return new Promise((resolve, reject) => {
        var plate = permit.platenum.toUpperCase()
        addPermit(plate, permit.merRuleid, permit.reasonid, permit.remark).then(response => {
          const data = response.data
          console.log(data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取放行规则
    GetRule({ commit }) {
      return new Promise((resolve, reject) => {
        getRule().then(response => {
          const data = response.data
          commit('SET_RULES', data.rules)
          commit('SET_REASONS', data.reasons)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default rule
