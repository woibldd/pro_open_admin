import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(Router)
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
//  权限选择
export function generatePermission(arr, parent = { permission: '' }) {
  return arr
    .filter(route => !route.hiddenPermissionSetting)
    .map(route => {
      let children = []
      const permission = parent.permission && parent.permission != '/' ? `${parent.permission}/${route.path}` : route.path
      if (route.children && route.children.length > 0) {
        children = generatePermission(route.children, { permission })
      }

      if (route.function && route.function.length > 0) {
        children.push(
          ...route.function.map(v => {
            return {
              ...v,
              isFunction: true,
              title: v.title,
              permission: `${permission}:${v.path}`
            }
          })
        )
      }
      return {
        ...route,
        title: route.meta ? route.meta.title : route.path,
        children: children,
        permission: permission
      }
    })
}
//陆游权限
export function generateRoutePermission(arr, parent = { permission: '' }, permissionsKeys = '', isAll) {
  return arr
    .map(route => {
      const permission = parent.permission && parent.permission != '/' ? `${parent.permission}/${route.path}` : route.path
      if (!permissionsKeys.split(',').includes(permission) && !isAll && !route.default) return 'nosupport'
      let children = []
      if (route.children && route.children.length > 0) {
        children = generateRoutePermission(route.children, { permission }, permissionsKeys, isAll)
      }
      return {
        ...route,
        // title: route.meta ? route.meta.title : route.path,
        children: children.filter(v => v != 'nosupport'),
        permission: permission
      }
    })
    .filter(v => v != 'nosupport')
}
//审核
// token
export const TokenApproval = [
  {
    path: 'token/list',
    name: 'Token',
    component: () => import('@/views/approval/token/list'),
    meta: { title: 'Token审核列表', icon: 'table' }
  },
  {
    path: 'token/detail/:id',
    name: 'tokenDetail',
    hidden: true,
    component: () => import('@/views/approval/token/detail'),
    meta: { title: 'Token详情', icon: 'table' }
  }
]

export const NFTApproval = [
  {
    path: 'NFT/list',
    name: 'NFT',
    component: () => import('@/views/approval/nft/list'),
    meta: { title: 'NFT审核列表', icon: 'table' }
  },
  {
    path: 'NFT/detail/:id',
    name: 'NFTDetail',
    hidden: true,
    component: () => import('@/views/approval/nft/detail'),
    meta: { title: 'NFT详情', icon: 'table' }
  }
]

export const DAppApproval = [
  {
    path: 'DAPP/list',
    name: 'DAPP',
    component: () => import('@/views/approval/dapp/list'),
    meta: { title: 'DApp审核列表', icon: 'table' }
  },
  {
    path: 'DAPP/detail/:id',
    name: 'DAPPDetail',
    hidden: true,
    component: () => import('@/views/approval/dapp/detail'),
    meta: { title: 'DApp详情', icon: 'table' }
  }
]


export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    meta: { title: '首页', icon: 'dashboard' },
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' },
        function: [
          {
            title: 'charts',
            path: 'charts'
          }
        ]
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    hiddenPermissionSetting: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    hiddenPermissionSetting: true
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!

]

export const asyncRoutes = [
  {
    path: '/approval',
    component: Layout,
    redirect: '/approval/token/list',
    name: 'Approval',
    meta: { title: '审核列表', icon: 'el-icon-s-help' },
    children: [...TokenApproval,...DAppApproval]
  },
  {
    path: '/userManagemen',
    name: 'userManagemen',
    component: Layout,
    redirect: '/userManagemen/list',
    meta: { title: '账户管理', icon: 'tree' },
    children: [
      {
        path: 'list',
        name: 'userManagemenList',
        component: () => import('@/views/openplatform/list.vue'),
        meta: { title: '账户管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/openUserManagemen',
    name: 'openUserManagemen',
    component: Layout,
    redirect: '/openUserManagemen/list',
    meta: { title: '管理员管理', icon: 'tree' },
    children: [
      {
        path: 'list',
        name: 'openUserManagemenList',
        component: () => import('@/views/userManagemen/list.vue'),
        meta: { title: '管理员列表', icon: 'form' }
      }
    ]
  },
  {
    path: '/operation',
    component: Layout,
    redirect: '/operation/list',
    meta: { title: '日志管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'operationList',
        component: () => import('@/views/operation/list.vue'),
        meta: { title: '日志列表', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, default: true , hiddenPermissionSetting:true}
]

const createRouter = () =>{
  const routes = generateRoutePermission(constantRoutes, { permission: '' }, '', true)
  return  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes
  })
}
 

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
