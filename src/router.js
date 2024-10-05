import { createWebHistory, createRouter } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import { getSession } from './hooks/useGetSession'
import SubjectsPage from './pages/SubjectsPage.vue'

const { user } = getSession()

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/login',
    component: LoginPage,
    beforeEnter: () => {
      if (user) {
        window.location.assign('/')
        return false
      } else return true
    }   
  },
  {
    path: '/registro',
    component: RegisterPage,
    beforeEnter: () => {
      if (user) {
        window.location.assign('/')
        return false
      } else return true
    }   
  },
  {
    path: '/materias',
    component: SubjectsPage,
    beforeEnter: () => {
      if (!user) {
        window.location.assign('/login')
        return false
      } else return true
    }   
  }
  // { path: '/products', component: ProductsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router