import fetch from '@/utils/fetch'

export function addPermit(platenum, merRuleid, reasonid, remark) {
  return fetch({
    url: '/permit',
    method: 'post',
    data: {
      platenum,
      merRuleid,
      reasonid,
      remark
    }
  })
}

export function getRule() {
  return fetch({
    url: '/permit/rule',
    method: 'get'
    // params: {  }
  })
}

