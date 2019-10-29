const KEY = 'hm-toutiao-user-key'
const local = {
  setUser (user) {
    var usercontent = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, usercontent)
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY))
  },
  removeUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default local
