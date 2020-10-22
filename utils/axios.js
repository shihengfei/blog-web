/* eslint-disable */

import axios from 'axios'
import { Message } from 'element-ui'
// import { Cache } from '@utils';
// import { router, history } from 'umi';



// 鉴权白名单
// const authWhiteList = ['/user/login'];

const Service = axios.create({
  baseURL: 'http://127.0.0.1:7002/api'
});


// 添加请求拦截器
Service.interceptors.request.use(function (config) {
  // if (!authWhiteList.includes(config.url)) {
  //   const userInfo = Cache.get('userInfo');
  //   config['headers']['authorization'] = `Bearer ${userInfo.token}`
  // }
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
  // if (data.code === 401) {
  //   const { pathname, search } = window.location;
  //   router.push(`/login?callbackUrl=${encodeURIComponent(pathname + search)}`);
  //   // 清除楚缓存用户信息数据
  //   const Store = window.g_app._store
  //   Store.dispatch({ type: 'userInfo/USERINFO', payload: null });
  //   // Store.dispatch({ type: 'navigation/CHANGE_OPENLIST', payload: null });
  //   // Store.dispatch({ type: 'navigation/MENU_COLLAPSED', payload: null });
  //   Store.dispatch({ type: 'navigation/CHANGE_MENULIST', payload: null });
  // }
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