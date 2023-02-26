import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/cityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/weather/:state/:city',
      name: 'cityView',
      component: CityView,
      meta: {
        title: '天气'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state
      ? `${to.params.state}, ${to.params.city}`
      : to.meta.title
  }`
  next()
})

export default router
