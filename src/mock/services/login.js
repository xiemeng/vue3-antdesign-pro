import Mock from 'mockjs2'
import { builder } from '../util'

export const verify = (option) => {
  const result = {
    id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb3JwIjoid3dlNmI2ZDk5ODE4ODA1YzliIiwiaXNzIjoiYXV0aDAiLCJzdGFmZk5hbWUiOiJ0ZWQiLCJ1dWlkIjoiMjViZjczNWFkMzRhNGVlODliOGY0Zjc0MmI1ZDk3MmQiLCJzdGFmZklkIjoiMTA1NCJ9.IIlLIkY6lqkjOBS-0LTd06fby9JdsvOkUI4h5Ve7J2Q',
    corpId: 'ww4f5b5002723b0ba8' //'ww4f5b5002723b0ba8'
  }
  return builder(result)
}
export const admin = (option) => {
  const result = {
    'permission': [{
      'id': '1',
      'pid': '0',
      'name': 'index',
      'title': '博主广场',
      'children': [{
        'id': '100',
        'pid': '1',
        'name': 'AboutView',
        'title': '博主库',
        'children': null
      },
      {
        'id': '101',
        'pid': '1',
        'name': 'home',
        'title': '商品库',
        'children': null
      },
      ]
    },
    ],
  }
  return builder(result)
}
export const logout = (option) => {
  const result = {
    id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb3JwIjoid3dlNmI2ZDk5ODE4ODA1YzliIiwiaXNzIjoiYXV0aDAiLCJzdGFmZk5hbWUiOiJ0ZWQiLCJ1dWlkIjoiMjViZjczNWFkMzRhNGVlODliOGY0Zjc0MmI1ZDk3MmQiLCJzdGFmZklkIjoiMTA1NCJ9.IIlLIkY6lqkjOBS-0LTd06fby9JdsvOkUI4h5Ve7J2Q',
    corpId: 'ww4f5b5002723b0ba8' //'ww4f5b5002723b0ba8'
  }
  return builder(result)
}

Mock.mock(/\/api\/management\/login/, 'get', verify)
Mock.mock(/\/api\/management\/admin/, 'get', admin)
Mock.mock(/\/api\/management\/logout/, 'get', logout)