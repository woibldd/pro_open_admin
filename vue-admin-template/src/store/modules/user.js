import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

import router, { resetRouter, generateRoutePermission, generatePermission, asyncRoutes, constantRoutes } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: {
      create_time: '',
      id: '',
      loginName: '',
      permission: '',
      roleId: '',
      update_time: ''
    },
    routes: [],
    addRoutes: [],
    permissionTree: generatePermission([...constantRoutes, ...asyncRoutes])
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, data) => {
    Object.assign(state.userInfo, data)
  },
  SET_ROUTES: (state, routes) => {
    console.log(routes)
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // user login
  login({ commit, dispatch }, data) {
    const { username, password } = data
    return new Promise((resolve, reject) => {
      login({ loginName: username.trim(), password: password })
        .then(async response => {
          const { data } = response
          commit('SET_TOKEN', data.jwtToken)
          // commit('SET_USER_INFO', data)
          setToken(data.jwtToken, data.expires)
          // const accessRoutes = await dispatch('generateRoutes', data.permission)
          // router.addRoutes(accessRoutes)
          resolve()
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          commit('SET_USER_INFO', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // logout(state.token)
      //   .then(() => {
      //     removeToken(); // must remove  token  first
      //     resetRouter();
      //     commit("RESET_STATE");
      //     resolve();
      //   })
      //   .catch(error => {
      //     reject(error);
      //   });
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  generateRoutes({ commit }, permission = '') {
    permission= permission.trim()
    return new Promise(resolve => {
      let accessedRoutes
      // resetRouter()
      if (permission.split(',').includes('admin')) {
        accessedRoutes = generateRoutePermission(asyncRoutes || [], { permission: '' }, permission, true)
      } else {
        accessedRoutes = generateRoutePermission(asyncRoutes, { permission: '' }, permission)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
