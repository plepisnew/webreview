import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Websites from '@/views/Websites'
import Reviews from '@/views/Reviews'
import Home from '@/views/Home'
import Profile from '@/views/Profile'

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
      path: '/reviews',
      name: 'reviews',
      component: Reviews
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
    }
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.token
  if (token && ['register', 'login'].includes(to.name)) {
    next({ name: 'home' })
  }
  if (!token && !['register', 'login'].includes(to.name)) {
    next({ name: 'login' })
  }
  next()
})
export default router
