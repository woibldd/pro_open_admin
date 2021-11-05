import request from '@/utils/request'
// http://dev.bitkeep.top/docs/open/pro_open_admin


export function getList(data) {
  return request({
    url: '/openplatform/list',
    method: 'get',
    params: data
  })
}
