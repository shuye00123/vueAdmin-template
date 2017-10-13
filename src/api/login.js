import fetch from '@/utils/fetch'

export function login(username, password, from) {
  return fetch({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
      from
    }
  })
}

export function wxlogin(code, from) {
  return fetch({
    url: '/login',
    method: 'post',
    data: {
      code,
      from
    }
  })
}

export function getInfo() {
  return fetch({
    url: '/user/info',
    method: 'get'
    // params: {  }
  })
}

export function logout() {
  return fetch({
    url: '/logout',
    method: 'get'
  })
}
