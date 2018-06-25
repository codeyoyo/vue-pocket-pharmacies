import Loader from '../../components/load/index'
import { Toast } from 'mint-ui'
let state = {
  // setTimeout对象
  timer: null,
  // 当前剩余的时间
  timer_click: 30
}

const actions = {
  // 开始倒计时
  startTimer({ commit, state, dispatch, getters }) {
    // 每一次使用都得重置倒计时
    dispatch('clearTimer')
    // 设置倒计时
    state.timer = window.setInterval(() => {
      // 嘀嗒嘀嗒嘀嗒嘀嗒, 时针它不停在转动...
      state.timer_click--
      // 如果循环的这段时间 state.fetchCount === 0 的话，直接结束.事实上加上这个判断，就等于这个store是依赖fetchCount。
      if (getters.fetchCount === 0) {
        // 删除并且重置倒计时
        dispatch('clearTimer')
      // 如果超时弹出提示
      } else if (state.timer_click <= 0) {
        // 清空异步请求数量
        dispatch('set_fetch_zero')
        // 关闭Loading图
        Loader.hide()
        // 弹出提示
        Toast('请求失败，网络异常')
      }
    }, 1000)
  },

  // 删除并且重置倒计时
  clearTimer({ commit, state }) {
    // 删除倒计时器
    window.clearInterval(state.timer)
    // 重置setTimeout对象
    state.timer = null
    // 重置剩余的时间
    state.timer_click = 30
  }
}

export default {
  state,
  actions
}
