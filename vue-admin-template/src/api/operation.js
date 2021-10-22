
import request from '@/utils/request'

export function getList(
  params = {
    pageNum: 1,
    pageSize: 10
  }
) {
  return request({
    url: '/operation/list',
    method: 'get',
    params
  })
}