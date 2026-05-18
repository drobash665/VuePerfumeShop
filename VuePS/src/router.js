import {createRouter, createWebHistory} from 'vue-router';
import CreateFragrance from "@/components/CreateFragrance.vue";
import Home from '@/components/Home.vue';
import Brands from '@/components/Brands.vue';
import Fragrances from "@/components/Fragrances.vue";

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/brands',
    component: Brands,
  },
  {
    path: '/fragrances',
    component: Fragrances,
  },
  {
    path: '/createFragrance',
    component: CreateFragrance,
  },
  {
    path: '/createFragrance/:id?',
    component: CreateFragrance,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
