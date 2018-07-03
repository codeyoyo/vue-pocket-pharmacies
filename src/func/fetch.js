import load from "../components/load/index";
import store from "../store/index";
import {
  Toast
} from 'mint-ui';
import 'whatwg-fetch';
const Object = require('core-js/library/es6/object');

let action_url = "http://120.78.69.215:1101/api/v1/"; //测试地址

const handleFetch = (apiUrl, params = '', showLoad = true) => {
  let contentType = params.method == 'POST' ? 'application/json' : 'text/plain';
  let jwt = store.getters.jwt;
  let headersObj = {
    "Accept": '*/*',
    "Content-Type": contentType
  };
  if (jwt != '' && jwt) {
    Object.assign(headersObj, {
      'Authorization': 'Bearer ' + jwt
    });
  }
  let option = {
    headers: headersObj
  }

  option = Object.assign(params, option);

  let request_url = action_url + apiUrl;

  store.dispatch('set_fetch_count', '+');

  // 开始倒计时
  store.dispatch('startTimer');
  if (showLoad) {
    load.show();
  }
  return window.fetch(request_url, option).then(checkStatus).catch(throwError);
}

/**
 * helper methods
 * 验证状态码
 */
const checkStatus = (response) => {
  // 请求数量--
  store.dispatch('set_fetch_count', '-');

  // 如果请求数量已经为0，那么关闭loader.并且重置fetchCount
  if (store.state.fetchCount <= 0) {
    // 重置fetchCount
    store.dispatch('set_fetch_zero')
    // 关闭loader
    load.hide();
  }
  // 判断请求状态
  if (response.status >= 200 && response.status < 300) {
    let jwt = response.headers.get('Authorization');
    if (jwt && jwt != null) {
      store.dispatch('setJwt', jwt);
    }
    fundebug.notify("ApiInfo", response);
    // 返回Promise 
    return response.json()
  } else {
    // 服务器响应异常
    Toast('网络异常,请稍后再试！');
    fundebug.notify("ApiError", response);
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

/**
 * helper methods
 * 抛出响应异常
 */
const throwError = (err) => {
  // 请求数量--
  store.dispatch('set_fetch_count', '-')

  // 如果请求数量已经为0，那么关闭loader。并且仅弹出一次错误提示.并且重置fetchCount
  if (store.state.fetchCount <= 0) {
    // 重置fetchCount
    store.dispatch('set_fetch_zero');
    // 关闭loader
    load.hide();
    // 弹出异常提示
    Toast('网络异常,请稍后再试！');
  }

  fundebug.notify("ApiError", err);
  // 弹出错误供调试
  throw new Error(err.msg);
}

/**
 * core methods
 * 发送post请求
 */
const postData = (url, params, requestUrl = '', showLoad = false) => {
  if (requestUrl != '') {
    action_url = requestUrl;
  } else {
    action_url = "http://120.78.69.215:1001/api/v1/";
  }
  return handleFetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  }, showLoad)
}

/**
 * core methods
 * 发送get请求
 */
const getData = (url, requestUrl = '', showLoad = false) => {
  if (requestUrl != '') {
    action_url = requestUrl
  } else {
    action_url = "http://120.78.69.215:1001/api/v1/";
  }
  return handleFetch(url, {
    method: 'GET'
  }, showLoad)
}

const setUrl = (apiUrl) => {
  action_url = apiUrl;
}

export default {
  postData,
  getData,
  setUrl
}
