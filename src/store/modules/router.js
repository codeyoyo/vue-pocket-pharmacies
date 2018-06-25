let state = {
    router: {}
}

const getters = {
    router(state) {
        return state.router;
    }
}

const actions = {
    saveRouter({ commit, state }, data) {
        state.router=data;
    }
}

export default {
    state,
    getters,
    actions
}