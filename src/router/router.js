import { createRouter, createWebHistory } from 'vue-router';
import Message from '../view/Message.vue';
import Home from '../view/Home.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/message/:roomId',
    name: 'message',
    component: Message
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router