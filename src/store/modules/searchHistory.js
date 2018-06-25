import dataHelp from "../../func/dataHelp";
const cookieName = 'YJS_Search_History'
let state = {
  search_history: []
}

const getters = {
  search_history(state) {
    let str = dataHelp.getData(cookieName);
    if (str != '' && str) {
      state.search_history = JSON.parse(str)
    }
    return state.search_history
  }
}

const actions = {
  set_search_history({
    commit,
    state
  }, data) {
    let str = dataHelp.getData(cookieName);
    if (str != '' && str) {
      state.search_history = JSON.parse(str)
    }
    let canSave = true
    for (let i = 0; i < state.search_history.length; i++) {
      let item = state.search_history[i]
      if (item == data) {
        canSave = false
        break;
      }
    }
    if (canSave) {
      state.search_history.push(data)
      dataHelp.setData(cookieName, JSON.stringify(state.search_history));
    }
  },
  clear_history({
    commit,
    state
  }){
    state.search_history=[];
    dataHelp.delData(cookieName);
  }
}

export default {
  state,
  getters,
  actions
}
