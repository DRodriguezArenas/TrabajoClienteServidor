import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import UpdateView from '../views/UpdateView.vue'
import GryffindorView from '../views/Gryffindor.vue'
import RavenclawView from '../views/Ravenclaw.vue'
import SlytherinView from '../views/Slytherin.vue'
import HufflepuffView from '../views/Hufflepuff.vue'
import FavoritosView from '../views/FavoritosView.vue'
import ChatView from '../views/ChatView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/update',
      name: 'update',
      component: UpdateView
    },
    {
      path: '/gryffindor',
      name: 'gryffindor',
      component: GryffindorView
    },
    {
      path: '/ravenclaw',
      name: 'ravenclaw',
      component: RavenclawView
    },
    {
      path: '/slytherin',
      name: 'slytherin',
      component: SlytherinView
    },
    {
      path: '/hufflepuff',
      name: 'hufflepuff',
      component: HufflepuffView
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: FavoritosView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView
    }
  ]
})

export default router
