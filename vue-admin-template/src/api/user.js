import request from '@/utils/request'
// http://dev.bitkeep.top/docs/open/pro_open_admin
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/user/add',
    method: 'get',
    data
  })
}

export function getList(data) {
  return request({
    url: '/user/list',
    method: 'get',
    params: data
  })
}


 
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
