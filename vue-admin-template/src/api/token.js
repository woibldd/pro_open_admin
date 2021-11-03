import request from '@/utils/request'


export function getPrice(
  params 
) {
  return request({
    url: '/token/getPrice',
    method: 'get',
    params
  })
}
export function getList(
  params = {
    pageNum: 1,
    pageSize: 10
  }
) {
  return request({
    url: '/token/list',
    method: 'get',
    params
  })
}
export function  getDetails(params = {
 id:0
}){
  return request({
    url: '/token/detail',
    method: 'get',
    params
  })
}

export function update(data = {}) {
  return request({
    url: '/token/update',
    method: 'post',
    data
  })
}
export function verify(data = {}) {
  return request({
    url: '/token/verify',
    method: 'post',
    data
  })
}
