import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import { deepClone } from '@/utils/util'
import { admin, logout } from '@/api/login'
export const userStore = defineStore('user', () => {
  const info = ref({}) // 用户基本信息
  const permissions = ref([]) // 路由权限
  const accessedRouters = ref([])
  function changeInfo(val) {
    info.value = val
  }
  function changeAccessedRouters(val) {
    accessedRouters.value = val
  }
  function changePermissions(val) {
    permissions.value = val
  }
  // 获取用户信息
  function GetInfo(params) {
    return new Promise((resolve, reject) => {
      admin(params).then(res => {
        changeInfo({ name: '张三' })
        const roles = res.data.permission
        const asyncRoute = deepClone(asyncRouterMap)
        const accessedRouter = filterAsyncRouter(asyncRoute, roles)
        changeAccessedRouters(accessedRouter)
        resolve(accessedRouter)
      }).catch(error => {
        reject(error)
      })
    })
  }
  // 退出
  function Logout(params) {
    return new Promise((resolve, reject) => {
      logout(params).then(res => {
        localStorage.removeItem('ACCESS_TOKEN')
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  return { info, permissions, accessedRouters, changeInfo, changePermissions, GetInfo, Logout }
})

function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}