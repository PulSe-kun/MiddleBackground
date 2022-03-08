import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
import { getToken, cleanAll } from '@/utils/MyAuth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  // 👉注意baseUrl 和proxy代理 只能同时存在一个
  // ⚡如果发送的网络请求跨域了 就设置代理 不跨域就用baseURL
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://leju.bufan.cloud'
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  // 请求拦截器
  (config) => {
    // do something before request is sent

    // if (store.getters.token) { VueX
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    config.headers['token'] = getToken()
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // 响应拦截器
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm(
      //     'You have been logged out, you can cancel to stay on this page, or log in again',
      //     'Confirm logout',
      //     {
      //       confirmButtonText: 'Re-Login',
      //       cancelButtonText: 'Cancel',
      //       type: 'warning'
      //     }
      //   ).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }

      // 改写
      if (res.code === 20002) {
        cleanAll()
        router.push('/login')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
