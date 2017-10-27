import fetch from '@/utils/fetch'

export function addRecharge(amount) {
  return fetch({
    url: '/recharge/' + amount,
    method: 'get'
  })
}

export function prePay(id, from) {
  return fetch({
    url: '/recharge/pay',
    method: 'post',
    data: {
      id,
      from
    }
  })
}

