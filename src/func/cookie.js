export default {
    /**
     * 设置cookie
     * 
     * @param {any} cname 名称
     * @param {any} cvalue 值
     * @param {number} [exdays=10] 过期天数
     */
  setCookie(cname, cvalue, exdays = 10) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    const expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires
  },
  /**
   * 获取cookie
   * 
   * @param {any} cname 名称
   * @returns 
   */
  getCookie(cname) {
    const name = cname + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
    }
    return ''
  },
  /**
   * 删除cookie
   * 
   * @param {any} cname 名称
   */
  deleteCookie(cname) {
    this.setCookie(cname, '', -1)
  },
  /**
   * 删除所有的cookie
   * 
   */
  deleteAllCookies() {
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i += 1) {
      this.deleteCookie(ca[i].split('=')[0])
    }
  }
}
