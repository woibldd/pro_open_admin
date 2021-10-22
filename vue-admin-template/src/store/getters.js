const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  loginName: state => state.user.userInfo.loginName,
  permission: state => state.user.userInfo.permission,
  permission_routes: state => state.user.routes,
  permissionTree: state => state.user.permissionTree,
}
export default getters
