import router from './router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false }); // NProgress Configuration
import { userStore } from '@/stores/user';

const allowList = ['Login']; // 免登录名单
const loginRoutePath = '/Login';
const defaultRoutePath = '/';
router.beforeEach((to, from, next) => {
  const user = userStore();
  NProgress.start(); // start progress bar
  if (localStorage.getItem('ACCESS_TOKEN')) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath });
      NProgress.done();
    } else {
      if (router.getRoutes().length > 2) {
        // 当已经添加了路由直接进去
        next();
      } else {
        user
          .GetInfo()
          .then(res => {
            res?.forEach(item => {
              router.addRoute(item);
            });
            const redirect = decodeURIComponent(from.query.redirect || to.path);
            next({ path: redirect });
            // 刚添加了新路由，需要重定向访问才能进入页面
          })
          .catch(error => {
            console.log(error);
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            user.Logout().then(error => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } });
            });
          });
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next();
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } });
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
