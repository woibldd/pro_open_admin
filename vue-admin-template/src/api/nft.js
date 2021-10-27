import request from '@/utils/request'

export function getList(
  params = {
    pageNum: 1,
    pageSize: 10
  }
) {
  return request({
    url: '/nft/list',
    method: 'get',
    params
  })
}
export function  getDetails(params = {
 id:0
}){
  return request({
    url: '/nft/detail',
    method: 'get',
    params
  })
}

export function verify(data = {}) {
  return request({
    url: '/nft/verify',
    method: 'post',
    data
  })
}
