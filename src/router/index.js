import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Cart from '@/components/Cart.vue';
import Register from '@/components/Register.vue';
import JsonTable from '@/components/JsonTable.vue';
import AboutPage from '@/components/AboutPage.vue';
import UserProfile from '@/components/UserProfile.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart },
  { path: '/register', component: Register },
  { path: '/json-table', component: JsonTable},
  { path: '/about', component: AboutPage},
  { path: '/user-profile', component: UserProfile}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
