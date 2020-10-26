/* eslint-disable */

import axios from 'axios'
import { Message } from 'element-ui'

const whiteList = ['/admin/user/login']

const Service = axios.create({
  baseURL: process.env.HTTP_API
});


// 添加请求拦截器
Service.interceptors.request.use(function (config) {
  const { url } = config;
  if (!url.startsWith('/web') && !whiteList.includes(url)) {
    // 实例初始化完毕以后 nuxt 会在 window 全局注入$nuxt ，通过$nuxt.$store 可以访问 store，$nuxt.$router 可以访问到router，但是需要注意的是，初始化完毕以前是无法访问$nuxt的，所以需要再初始化完毕之后才能使用该方法。
    config['headers']['authorization'] = `Bearer ${$nuxt.$store.state.admin.token}`
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Service.interceptors.response.use(function (response) {
  const config = response.config.config
  const data = response.data
  // 对响应数据做点什么
  if (!data.success && !config.selfTip) {
    Message.error(data.message);
  }
  if (data.code === 401) {
    const { $store, $router } = $nuxt
    $store.commit('admin/setToken', null);
    $router.push('/admin/login');
  }
  return config.allData ? data : data.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export const post = (url, data = {}, config = {}) => {
  return new Promise(reslove => {
    Service({
      method: 'post',
      data: data,
      url: url,
      config
    }).then(res => {
      reslove(res)
    })
  })
}

/**
 * 
 * @param {*} url 请求url
 * @param {*} data 请求参数
 * @param {*} config [allData]：是否获取全量数据 [selfTip]：是否自行提示
 */
export const get = (url, data = {}, config = {}) => {
  return new Promise(reslove => {
    Service({
      method: 'get',
      params: data,
      url: url,
      config
    }).then(res => {
      reslove(res)
    })
  })
}

export const del = (url, data = {}, config = {}) => {
  return new Promise(reslove => {
    Service({
      method: 'delete',
      params: data,
      url: url,
      config
    }).then(res => {
      reslove(res)
    })
  })
}

export const put = (url, data = {}, config = {}) => {
  return new Promise(reslove => {
    Service({
      method: 'put',
      data: data,
      url: url,
      config
    }).then(res => {
      reslove(res)
    })
  })
}
