import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Website from '@/views/Website'
import Websites from '@/views/Websites'
import Review from '@/views/Review'
import Home from '@/views/Home'
import Profile from '@/views/Profile'
import Management from '@/views/Management'

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
      path: '/reviews/:id',
      name: 'review',
      component: Review
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
  if (token && ['register', 'login'].includes(to.name)) {
    next({ name: 'home' })
  }
  if (!token && !['register', 'login'].includes(to.name)) {
    next({ name: 'login' })
  }
  next()
})
export default router
