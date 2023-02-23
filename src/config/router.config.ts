// eslint-disable-next-line
import { FixedLayout, UserLayout,BlankLayout,BasicLayout,NestedLayout } from '@/layouts'

export const asyncRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: { title: '首页', keepAlive: true },
  redirect: '/AboutView',
  children: [
    {
      path: '/AboutView',
      name: 'AboutView',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: 'about', keepAlive: true, icon: 'build' },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'home', keepAlive: true, icon: 'step-backward-outlined' },
    },
  ]
},
{
  path: '/:pathMatch(.*)',
  redirect: '/404',
  hidden: true
}
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
  path: '/Login',
  name: 'Login',
  component: () =>
    import('@/views/user/Login.vue')
},
{
  path: '/404',
  component: () =>
    import('@/views/exception/404.vue')
}
]