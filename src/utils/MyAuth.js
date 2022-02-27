const TokenKey = 'leju-admin-token'
const userInfoKey = 'leju-admin-userInfo'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(userInfoKey))
}

export function setUserInfo(token) { // ⚡注意 需要字符串数据 对象转字符串
  return localStorage.setItem(userInfoKey, JSON.stringify(token))
}

export function removeUserInfo() {
  return localStorage.removeItem(userInfoKey)
}

export function cleanAll() {
  localStorage.clear() // ⚡清除本地存储 注意只有getItem 有返回值
}
