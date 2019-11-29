const globalData = {
  // httpUrl: 'https://account-daily.yuantutech.com/account'
  httpUrl: 'http://10.10.11.187:8080'
}

export function set (key, val) {
  globalData[key] = val
}

export function get (key) {
  return globalData[key]
}