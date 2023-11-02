import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store/index'
import HomeView from '../views/HomeView.vue'
import Login from '../components/auth/UserLogin.vue'
import Register from '../components/auth/UserRegister.vue'
import MileageReportView from '../views/MileageReportView.vue'
import MileageUpdate from '../views/MileageUpdate.vue'
import MileageCreate from '../views/MileageCreate.vue'
import MainView from '../views/MainView.vue'
import FAQ from '../views/FAQView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/mileage_report',
    name: 'mileage_report',
    component: MileageReportView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mileage_create',
    name: 'mileage_create',
    component: MileageCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mileage_update',
    name: 'mileage_update',
    component: MileageUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: MainView
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQ
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const store = useStore()
    store.setLoggedInStatus()
    if (!store.isLoggedIn) {
      next({ name: 'login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
