// eslint-disable-next-line
import { FixedLayout, UserLayout, BlankLayout, BasicLayout, NestedLayout } from '@/layouts';

// NestedLayout 竖屏模式 BasicLayout 横屏模式  FixedLayout 自定义模式
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页', keepAlive: true },
    redirect: '/Home',
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', icon: 'icon-icon-test', flat: true },
      },
      {
        path: '/home1',
        name: 'home1',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '管理页', icon: 'icon-tuijian', flat: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    hidden: true,
  },
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/user/Login.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404.vue'),
  },
];
