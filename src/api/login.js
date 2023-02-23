// 正式数据，后面替代login.js 改名
import request from '@/utils/request'

const userApi = {
  login: '/management/login', // 登录
  admin: '/management/admin', // 获取用户信息
  logout: '/management/logout', // 退出登录
}

export function login(parameter) {
  return request({
    url: userApi.login,
    method: 'get',
    params: parameter
  })
}
export function admin(parameter) {
  return request({
    url: userApi.admin,
    method: 'get',
    params: parameter
  })
}
export function logout(parameter) {
  return request({
    url: userApi.logout,
    method: 'get',
    params: parameter
  })
}
