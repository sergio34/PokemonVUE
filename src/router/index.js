import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { //ruta home
    path: '/',
    name: 'home',
    component: HomeView
  },
  { //ruta sobre
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  { //ruta luga que es el juego
    path: '/fighter',
    name: 'fighter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //cargar solamente la pagina en lugar de que se carge todo el proyecto
    component: () => import(/* webpackChunkName: "fighter" */ '@/views/FightingView.vue')
  }
]

const router = createRouter({
  //esta por defecto
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
