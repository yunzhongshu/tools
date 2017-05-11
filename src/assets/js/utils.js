import Vue from 'vue'
import { Notification } from 'element-ui'

var deepCopy = (source) => {
  let result
  if (typeof source === 'object') {
    // array
    if (!isNaN(source.length)) {
      result = []
      for (let i = 0; i < source.length; i++) {
        result[i] = deepCopy(source[i])
      }
    } else {
      result = {}
      for (let key in source) {
        result[key] = deepCopy(source[key])
      }
    }
  } else {
    result = source
  }
  return result
}

var UTILS = {
  /**
   *   获取location的参数
   */
  locationRequestParam () {
    var url = location.search
    var theRequest = {}
    if (url.indexOf('?') !== -1) {
      var str = url.substr(1)
      let strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
      }
    }
    return theRequest
  },
  getResponseData (response) {
    return response.body.data
  },
  copyObj (dest, src) {
    if (src) {
      for (var key in dest) {
        if (!src[key]) {
          continue
        }
        if (typeof src[key] === 'object') {
          dest[key] = deepCopy(src[key])
        } else {
          dest[key] = src[key]
        }
      }
    }
  },
  deepCopy: deepCopy,
  isEmptyObj (obj) {
    for (let key in obj) {
      return false
    }
    return true
  },
  runDelay (func, ms) {
    if (!ms) {
      ms = 500
    }
    setTimeout(() => {
      func()
    }, ms)
  },
  requestPost (url, queryParam, resolve, reject) {
    Vue.http.post(url, queryParam).then(d => {
      let data = this.getResponseData(d)
      if (data) {
        resolve(data)
      } else {
        reject(d)
      }
    }, d => {
      Notification.error({
        title: 'error',
        message: 'code=' + d.status + ',message=' + d.statusText
      })
      reject(d)
    })
  },
  requestGet (url, options, resolve, reject) {
    Vue.http.get(url, options).then(d => {
      let data = this.getResponseData(d)
      if (data) {
        resolve(data)
      } else {
        reject(d)
      }
    }, d => {
      reject(d)
    })
  },
  /**
   *   日期时间格式化
   */
  formatDate (fmt, date = new Date()) {
    if (!(date instanceof Date)) {
      return date
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (`00${o[k]}`.substr(`${o[k]}`.length)))
      }
    }
    return fmt
  }
}

export default UTILS
