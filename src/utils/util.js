
export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () { }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword(pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
    variationCount += (variations[check] === true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}
/**
 *  图片压缩
 *  @param event 事件对象
 *  @param compression 压缩系数,0~100
 * */
export function imageZip(event, compression = 30) {
  return new Promise((resolve, reject) => {
    var file = event?.target?.files[0] || event?.dataTransfer?.files[0] || event
    if (file) {
      const reader = new window.FileReader()
      reader.readAsDataURL(file)
      reader.onerror = function () {
        reject('图片加载错误')
      }
      reader.onload = function (e) {
        var image = new Image()
        image.src = e.target.result
        image.onload = function () {
          var mime_type = 'image/jpeg'
          var cvs = document.createElement('canvas')
          cvs.width = this.width
          cvs.height = this.height
          var ctx = cvs.getContext('2d').drawImage(this, 0, 0, this.width, this.height)
          var newImageData = cvs.toDataURL(mime_type, compression / 100)
          resolve([newImageData, e.target.result])
        }
        image.onerror = function () {
          reject('图片加载错误')
        }
      }
    }
  })
}
/**
 *  下载资源  1:利用 canves 可获取跨域资源的属性来解决跨域问题
 *           2: 利用get请求下载blob类型,然后下载资源
 *  @param imgUrl 资源地址
 * */

export function dowmloadData(imgUrl, name) {
  return new Promise((resolve, reject) => {
    const nameTxt = name || 'picture'
    var img = new Image();
    const canvas = document.createElement('canvas');
    img.setAttribute('crossOrigin', 'anonymous'); // 跨域图片不能使用canvas的toDataURL和toBlob
    img.src = imgUrl + '?any_string_is_ok';
    img.onload = function () {
      canvas.width = this.width
      canvas.height = this.height
      var ctx = canvas.getContext('2d');
      ctx.drawImage(this, 0, 0, this.width, this.height)
      ctx.stroke();
      document.body.appendChild(canvas)
      canvas.toBlob((blob) => {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = `${nameTxt}.jpg`
        document.body.appendChild(a);
        a.click()
        a.remove()
        document.body.removeChild(canvas)
        resolve()
      }, 'image/jpeg', 1)
    }
    img.onerror = function () {
      document.body.removeChild(canvas)
      reject('图片下载失败')
    }
  })
}

/**
 *  图片合成 2张图片合成一张
 *  @param baseImg 第一张是底图 可以是链接或者base64
 *  @param baseImg 第二张是logo
 * */

export function ynthesisImages(baseImg, insetImg) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    const canvas = document.createElement('canvas');
    img.setAttribute('crossOrigin', 'anonymous'); // 跨域图片不能使用canvas的toDataURL和toBlob
    img.src = baseImg;
    img.onload = function () {
      //  绘制第一张图
      canvas.width = this.width
      canvas.height = this.height
      var mime_type = 'image/jpeg'
      var ctx = canvas.getContext('2d');
      ctx.drawImage(this, 0, 0, this.width, this.height)
      const multiple = 0.25 // 中间logo占大图比
      const insetWidth = canvas.width * multiple
      const insetHeight = canvas.height * multiple
      const leftMargin = ((canvas.width - insetWidth) / 2).toFixed(2)
      const topMargin = ((canvas.height - insetHeight) / 2).toFixed(2)
      // 绘制第二张图
      var inset = new Image()
      inset.setAttribute('crossOrigin', 'anonymous');
      inset.src = insetImg
      inset.onload = function () {
        ctx.drawImage(this, leftMargin, topMargin, insetWidth, insetHeight)
        var newImageData = canvas.toDataURL(mime_type, 1)
        resolve(newImageData)
      }
      inset.onerror = function () {
        reject('logo图加载错误')
      }
    }
    img.onerror = function () {
      reject('底图加载错误')
    }
  })
}
// 深拷贝
export const deepClone = source => {
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (const keys in source) { // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else { // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

/**
 *  字节数转换
 *  @param bytes 字节数
 * */

export function bytesToSize(bytes) {
  if (bytes == 0) return '0 B';
  var k = 1024, // or 1024
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
/**
 *  截取参数
 *  @param url 要截取的字符串
 *  @param key 要截取的字段
 * */
export function getUrlValue(url, key) {
  if (!url || !key) return url
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const str = url
  const i = str.indexOf('?');
  const r = str.substr((i + 1), str.length).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return ''
}

// 数组去重
export function removalRepeat(arr) {
  const result = []
  const obj = {}
  if (arr && isArray(arr)) {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (!obj[element]) {
        obj[element] = 1
        result.push(element)
      }
    }
  }
  return result
}
// 对象去重
export function removalRepeatObj(arr, key) {
  const result = []
  const obj = {}
  if (arr && isArray(arr)) {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index][key];
      if (!obj[element]) {
        obj[element] = 1
        result.push(arr[index])
      }
    }
  }
  return result
}
// 是否是字符串
export function isString(value) {
  return Object.prototype.toString.call(value) == '[object String]';
}
// 是否是数字
export function isNumber(value) {
  return Object.prototype.toString.call(value) == '[object Number]';
}
// 是否是布尔值
export function isBoolean(value) {
  return Object.prototype.toString.call(value) == '[object Boolean]';
}
// 是否undefined
export function isUndefined(value) {
  return Object.prototype.toString.call(value) == '[object Undefined]';
}
// 是否是null
export function isNull(value) {
  return Object.prototype.toString.call(value) == '[object Null]';
}
// 是否数组
export function isArray(value) {
  return Object.prototype.toString.call(value) == '[object Array]';
}
// 是否是函数
export function isFunction(value) {
  return Object.prototype.toString.call(value) == '[object Function]';
}
// 是否是对象
export function isObject(value) {
  return Object.prototype.toString.call(value) == '[object Object]';
}
// 是否是正则表达式
export function isRegExp(value) {
  return Object.prototype.toString.call(value) == '[object RegExp]';
}
// 是否是日期对象
export function isDate(value) {
  return Object.prototype.toString.call(value) == '[object Date]';
}
// 是否是blob对象
export function isBlob(value) {
  return Object.prototype.toString.call(value) == '[object Blob]';
}
// 是否是文件对象
export function isFile(value) {
  return Object.prototype.toString.call(value) == '[object File]';
}
/**
 * 函数防抖：持续触发，只执行最后一次
 *  @params fn 需要防抖的函数
 *  @params wait 等待的时间，单位是毫秒
 */
export function debounce(fn, wait) {
  let timeout = null;
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout)
    } else {
      timeout = setTimeout(fn, wait);
    }
  }
}
/**
 *
 * 函数节流：持续触发，每隔固定时间执行一次
 * @params fn 需要防抖的函数
 * @params wait 等待的时间，单位是毫秒
 * */
export function throttle(func, wait) {
  let prev = Date.now();
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    if (now - prev >= wait) {
      func.apply(context, args);
      prev = Date.now();
    }
  }
}
/**
 * 文件下载，需要是blob对象才行，需要设置请求头 responseType: 'blob'
 * */
export function downLoadFile(content, format = '.zip', name = (new Date()).valueOf()) {
  if (isBlob(content)) {
    const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=UTF-8' })
    const fileName = name + format
    if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = window.URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      window.URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  } else {
    console.warn('传过来的不是blob对象')
  }
}
/**
 * 锚点，传入锚点id
 * */
export function anchor(id) {
  var a = document.createElement('a')
  a.href = id
  document.body.appendChild(a)
  a.click()
  a.remove()
  document.body.removeChild(a)
}
export function validateHttp(url) {
  var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  let errorShow = false
  var objExp = new RegExp(Expression);
  if (objExp.test(url) == true) {
    errorShow = true
  } else {
    errorShow = false
  }
  return errorShow
}
