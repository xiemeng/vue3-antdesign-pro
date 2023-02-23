const OSS = require('ali-oss')
// 创建oss实例用于向阿里云发送请求
export const client = new OSS({
  region: 'oss-cn-hongkong',
  accessKeyId: 'LTAI5t9JLZqYbkYgycPGuVVW',
  accessKeySecret: 'yonQ2HmeVf0YvcXeMlDamaQfgoXBN7',
  bucket: 'mb-kolify-link'
})
// 存储目录
export const catelog = 'mb-kolify-link/'
// 生成uuid 用于生成图片名
export function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

