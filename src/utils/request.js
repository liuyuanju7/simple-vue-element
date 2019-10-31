import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance with config
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookie when sending cross-domain requests
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before sending request
    if (store.getters.token) {
      // let each request carry token ['X-Token'] is a custom headers key
      // can modify it according to the actual situation: self auth
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something when request error
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * The processing here needs to interact based on the actual interface
   * can determine request`s status by Http code or custom code
   * Here is an example
   * @param response
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Default Error Message',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: illegal token; 50012: other client logged in; 50014: Token expired
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // redirect login
        MessageBox.confirm('You have been logged out', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          //  todo reset token and login
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err: ' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
