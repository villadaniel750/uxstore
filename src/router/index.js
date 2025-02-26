// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Default from '@/layouts/Default.vue'
import Home from '@/views/Home.vue'
import Wallet from '@/views/Wallet.vue'
import ForFree from '@/views/ForFree.vue'
import Fan from '@/views/Fan.vue'
import Purchased from '@/views/Purchased.vue'
import Favorites from '@/views/Favorites.vue'
import Premieres from '@/views/Premieres.vue'
import MostSold from '@/views/MostSold.vue'
import Offers from '@/views/Offers.vue'
import TopRated from '@/views/TopRated.vue'
import Account from '@/views/Account.vue'
import WaitList from '@/views/WaitList.vue'
import WaitListStats from '@/views/WaitListStats.vue'
import AuthXCallback from '@/views/AuthXCallback.vue' // 🔹 Importar la vista de callback
import { store } from '../store'

const routes = [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: '/wallet',
        name: 'Wallet',
        component: Wallet,
      },
      {
        path: '/forFree',
        name: 'ForFree',
        component: ForFree,
      },
      {
        path: '/purchased',
        name: 'Purchased',
        component: Purchased,
      },
      {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites,
      },
      {
        path: '/premieres',
        name: 'Premieres',
        component: Premieres,
      },
      {
        path: '/mostsold',
        name: 'MostSold',
        component: MostSold,
      },
      {
        path: '/offers',
        name: 'Offers',
        component: Offers,
      },
      {
        path: '/topRated',
        name: 'TopRated',
        component: TopRated,
      },
      {
        path: '/account',
        name: 'Account',
        component: Account,
      },
      {
        path: '/waitlist',
        name: 'WaitList',
        component: WaitList,
      },
      {
        path: '/waitliststats',
        name: 'WaitListStats',
        component: WaitListStats,
      },
      {
        path: '/auth/x/callback', // 🔹 Nueva ruta para el callback de X
        name: 'AuthXCallback',
        component: AuthXCallback,
      },
      {
        path: "/:catchAll(.*)",
        name: "fan",
        component: Fan,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// 🔹 Middleware de autenticación antes de cada ruta
router.beforeEach((to, from, next) => {
  const publicPages = ['Home', 'fan', 'WaitList', 'WaitListStats', 'ForFree', 'Wallet', 'Favorites', 'AuthXCallback']; 
  const authRequired = !publicPages.includes(to.name); 

  if (authRequired && !store.getters.loggedIn) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router
