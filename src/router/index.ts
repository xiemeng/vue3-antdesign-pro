import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { constantRouterMap } from '@/config/router.config'


const hasGithubPages = import.meta.env.VITE_GHPAGES;

export default createRouter({
  history: hasGithubPages ? createWebHashHistory() : createWebHistory(),
  routes: constantRouterMap,
});
