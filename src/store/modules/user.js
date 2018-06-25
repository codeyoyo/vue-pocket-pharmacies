import dataHelp from "@/func/dataHelp";
const dataKey = 'user_key';
const jwtKey = "jwt_key";
let state = {
  userInfo: null,
  jwt: ''
}

const getters = {
  userInfo(state) {
    let result = dataHelp.getData(dataKey);
    if (result != '') {
      state.userInfo = JSON.parse(result);
    }
    return state.userInfo;
  },
  jwt(state) {
    let result = dataHelp.getData(jwtKey);
    if (result != '') {
      state.jwt = result;
    }
    return state.jwt;
  }
}

const actions = {
  saveUser({
    commit,
    state
  }, data) {
    state.userInfo = data;
    dataHelp.setData(dataKey, JSON.stringify(state.userInfo));
  },
  setJwt({
    commit,
    state
  }, data) {
    state.jwt = data;
    dataHelp.setData(jwtKey, state.jwt);
  },
  removeJwt({commit,state}){
    state.jwt='';
    dataHelp.delData(jwtKey);
  }
}

export default {
  state,
  getters,
  actions
}
