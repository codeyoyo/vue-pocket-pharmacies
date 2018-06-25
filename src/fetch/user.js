import ajax from "@/func/fetch";

/**
 * 用不了的登录接口
 * @param {String} loginId 登录ID
 * @param {String} passWord 密码
 */
const login = (loginId, password) => {
  let data = {
    loginId,
    password
  };
  return ajax.postData('Login', data);
}

/**
 * 密码登录接口
 * @param {String} phone 手机号
 * @param {String} password 密码
 */
const loginByPassword = (phone, password, geetest_challenge, geetest_validate, geetest_seccode) => {
  let data = {
    phone,
    password,
    geetest_challenge,
    geetest_validate,
    geetest_seccode
  };
  return ajax.postData('LoginByPassword', data);
}

/**
 * 手机号码注册
 * @param {String} phone 手机号
 * @param {String} validCode 验证码
 */
const phoneRegister = (phone, validCode) => {
  let data = {
    phone,
    validCode
  };
  return ajax.postData('PhoneRegister', data);
}

/**
 * 手机验证码获取
 * @param {String} phone 手机号码
 * @param {Number} type 类型，注册 = 1 登录 = 2 找回密码 = 3
 */
const phoneValidationCode = (phone, geetest_challenge, geetest_validate, geetest_seccode, type = 1) => {
  let data = {
    phone,
    type,
    geetest_challenge,
    geetest_validate,
    geetest_seccode
  };
  return ajax.postData('PhoneValidationCode', data);
}

/**
 * 获取验证码
 * @param {String} phone 手机号码
 * @param {Number} type 类型，注册 = 1 登录 = 2 找回密码 = 3
 */
const getFakeCode = (phone, type = 1) => {
  let data = {
    phone,
    type
  };
  return ajax.postData('GetFakeCode', data);
}

/**
 * 设置密码
 * @param {String} password 密码
 * @param {String} passwordConfirm 确认密码
 */
const setPassword = (password, passwordConfirm) => {
  let data = {
    password,
    passwordConfirm
  }
  return ajax.postData('SetPassword', data);
}

/**
 * 重置密码
 * @param {String} password 密码
 * @param {String} passwordConfirm 确认密码
 */
const reSetPassword = (password, passwordConfirm) => {
  let data = {
    password,
    passwordConfirm
  }
  return ajax.postData('ReSetPassword', data);
}

/**
 * 获取图片验证码
 * @param {String} phone  手机号码
 */
const getValidateCode = (phone) => {
  return ajax.getData(`GetValidateCode?phone=${phone}`);
}


/**
 * 快捷登录
 * @param {String} phone 手机号码
 * @param {String} validCode 验证码
 */
const loginByPhone = (phone, validCode) => {
  let data = {
    phone,
    validCode
  };
  return ajax.postData('LoginByPhone', data);
}

/**
 * 用户信息
 */
const accoutnInfo = () => {
  return ajax.getData('AccoutnInfo');
}

/**
 * 更新用户数据
 * @param {Object} data 用户数据 
 */
const updateAccountInfo = (data) => {
  var send = {
    "nickName": data.nickName,
    "realName": data.realName,
    "birthday": data.birthday,
    "sex": data.sex
  }
  return ajax.postData('UpdateAccountInfo', send);
}


export default {
  login,
  phoneRegister,
  phoneValidationCode,
  getFakeCode,
  setPassword,
  getValidateCode,
  loginByPassword,
  accoutnInfo,
  loginByPhone,
  updateAccountInfo,
  reSetPassword
}
