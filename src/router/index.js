// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Default from '@/layouts/Default.vue'
import Home from '@/views/Home.vue'
import Wallet from '@/views/Wallet.vue'
import FirstSteps from '@/views/FirstSteps.vue'
import Fan from '@/views/Fan.vue'
import Purchased from '@/views/Purchased.vue'
import Favorites from '@/views/Favorites.vue'
import Ecosystem from '@/views/Ecosystem.vue'
import Community from '@/views/Community.vue'
import Featured from '@/views/Featured.vue'
import Explore from '@/views/Explore.vue'
import Account from '@/views/Account.vue'
import WaitList from '@/views/WaitList.vue'
import WaitListStats from '@/views/WaitListStats.vue'
import AuthXCallback from '@/views/AuthXCallback.vue' // 🔹 Importar la vista de callback
import { store } from '../store'
import VideoUpload from '@/views/VideoUpload.vue'
import TestApi from '@/views/TestApi.vue';
import NonAccount from '@/views/NonAccount.vue';
import UserProfile from '@/views/UserProfile.vue'


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
        path: '/:username',
        name: 'userProfile',
        component: UserProfile,
        props: true
      },
      {
        path: '/fan',
        name: 'fan',
        component: Fan,       
      },
      {
        path: '/wallet',
        name: 'Wallet',
        component: Wallet,
      },
      {
        path: '/firststeps',
        name: 'FirstSteps',
        component: FirstSteps,
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
        path: '/videoupload',
        name: 'VideoUpload',
        component: VideoUpload,
      },
      {
        path: '/ecosystem',
        name: 'Ecosystem',
        component: Ecosystem,
      },
      {
        path: '/community',
        name: 'Community',
        component: Community,
      },
      {
        path: '/featured',
        name: 'Featured',
        component: Featured,
      },
      {
        path: '/explore',
        name: 'Explore',
        component: Explore,
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
        path: '/oauth2/callback',
        name: 'AuthXCallback',
        component: AuthXCallback,
      },
      {
        path: '/test/api',
        name: 'TestApi',
        component: TestApi,
      },
      {
        path: "/:catchAll(.*)",
        name: "nonAccount",
        component: NonAccount,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
})

// 🔹 Middleware de autenticación antes de cada ruta
router.beforeEach((to, from, next) => {
  const publicPages = ['Home','Wallet', 'fan', 'userProfile', 'WaitList', 'WaitListStats', 'FirstSteps', 'Ecosystem', 'Community', 'Featured', 'Explore', 'AuthXCallback', 'TestApi', 'nonAccount'];
  const authRequired = !publicPages.includes(to.name);

  if (authRequired && !store.getters.loggedIn) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router
