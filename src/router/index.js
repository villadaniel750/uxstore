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

router.beforeEach((to, from, next) => {
  const publicPages = ['Home', 'fan', 'WaitList', 'WaitListStats', 'ForFree', 'Wallet', 'Favorites']; // agregar nombres de rutas que no requieren autenticación
  const authRequired = !publicPages.includes(to.name); // verificar si la página actual requiere autenticación

  // Si se requiere autenticación y el usuario no está autenticado, redirigir a 'Home'
  if (authRequired && !store.getters.loggedIn) {
    next({ name: 'Home' });
  } else {
    next(); // en caso contrario, proceder normalmente
  }
});


export default router//ss
