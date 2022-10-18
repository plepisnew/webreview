import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Website from '@/views/Website'
import Websites from '@/views/Websites'
import Home from '@/views/Home'
import Profile from '@/views/Profile'
import Management from '@/views/Management'
import parseJWT from '@/utils/parseJWT'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/websites',
      name: 'websites',
      component: Websites
    },
    {
      path: '/websites/:name',
      name: 'website',
      component: Website
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: Profile
    },
    {
      path: '/management',
      name: 'management',
      component: Management
    }
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.token
  if (to.name === 'management') {
    const user = parseJWT(token)
    if (!user.isAdmin) next({ name: 'home' })
  }
  if (token && ['register', 'login'].includes(to.name)) {
    next({ name: 'home' })
  }
  if (!token && !['register', 'login'].includes(to.name)) {
    next({ name: 'login' })
  }
  next()
})
export default router
