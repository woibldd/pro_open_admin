import request from '@/utils/request'



export function getList(
  params = {
    pageNum: 1,
    pageSize: 10
  }
) {
  return request({
    url: '/dapp/list',
    method: 'get',
    params
  })
}
export function  getDetails(params = {
 id:0
}){
  return request({
    url: '/dapp/detail',
    method: 'get',
    params
  })
}

export function update(data = {}) {
  return request({
    url: '/dapp/update',
    method: 'post',
    data
  })
}
export function verify(data = {}) {
  return request({
    url: '/dapp/verify',
    method: 'post',
    data
  })
}

export function getMultiLanguageList(params = {}) {
  return request({
    url: '/dapp/getMultiLanguageList',
    method: 'get',
    params
  })
}