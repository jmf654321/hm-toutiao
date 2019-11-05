import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Nofind from '@/views/404'
import local from '@/untils/local'
import Article from '@/views/article'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Image from '@/views/image'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome },
        { path: '/article', component: Article },
        { path: '/comment', component: Comment },
        { path: '/setting', component: Setting },
        { path: '/image', component: Image }
      ]
    },
    { path: '*', component: Nofind }
  ]

})
router.beforeEach((to, from, next) => {
  const user = local.getUser() || {}
  // 如果登陆了
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') { // 查看要去的地址
      next()
    } else {
      next('/login')
    }
  }
})
export default router
