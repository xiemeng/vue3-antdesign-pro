import { isIE } from '@/utils/util'

if (isIE()) {
  console.error('[antd-pro] ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.')
}
// 使用同步加载依赖
// 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
console.log('[antd-pro] mock mounting')
import Mock from 'mockjs2'
import './services/login'

Mock.setup({
  timeout: 800 // setter delay time
})
console.log('[antd-pro] mock mounted')
