// router.js 就是 vue-router 的配置文件

// 1. 引入 vue
// 2. 引入 vue-router
// 3. 使用 vue.use(vue-router)
// 4. 路由配置
// new VueRouter({
//   routes: [

//   ]
// })
// 5. 暴露这个配置

import Vue from 'vue';
import VueRouter from 'vue-router';
// import Film from './views/Film.vue';
// import Cinema from './views/Cinema.vue';
// import Center from './views/Center.vue';
// import City from './views/City.vue';
// import Home from './views/Home.vue';
// import Detail from './views/Detail.vue';
// import Login from './views/Login.vue';
// import Card from './views/Card.vue';
// import Money from './views/Money.vue';
// import System from './views/System.vue';
import Nprogress from 'nprogress';
Nprogress.configure({ showSpinner: true });

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '/',
      component: () => import('./views/Home/Index.vue'),
      children: [
        // PS: 不是一级路由的话，path路径前面不要加 /
        // PS: 二级或二级以上的路由，他们的url地址，是会从一级路由开始一直做追加的。
        {
          path: 'films',
          component: () => import('./views/Home/Film/Index.vue'),
          children: [
            {
              path: 'MzHot',
              component: () => import('./views/Home/Film/MzHot/Index.vue')
            },
            {
              path: 'MzSoon',
              component: () => import('./views/Home/Film/MzSoon/Index.vue')
            },
            {
              path: '',
              redirect: '/films/MzHot'
            }
          ]
        },
        {
          path: 'cinemas',
          component: () => import('./views/Home/Cinema/Index.vue')
        },
        {
          path: 'center',
          component: () => import('./views/Home/Center/Index.vue')
        },
        {
          path: '',
          redirect: '/films'
        }
      ]
    },
    {
      name: 'hhh',
      path: '/city',
      component: () => import('./views/City/Index.vue')
    },
    {
      path: '/detail/:id',
      component: () => import('./views/Detail/Index.vue')
    },
    {
      path: '/card',
      component: () => import('./views/Card/Index.vue')
    },
    {
      path: '/money',
      component: () => import('./views/Money/Index.vue')
    },
    {
      path: '/system',
      component: () => import('./views/System/Index.vue')
    },
    {
      path: '/login',
      component: () => import('./views/Login/Index.vue')
    },
    // 设置一个 通配符的 一级路由，当url地址无法与上面的规则匹配的时候，就会跟我匹配。
    {
      path: '*',
      redirect: '/films'
    }
  ]
})

/*
  路由守卫中

  a -> b
  to  将要去的路由的路由对象      b
  from 从哪里去的路由的路由对象   a
  next 是否允许去。

  a -> b 如果不想去到 b   next(false)  或者 不使用 next()
         如果允许就得     next()
         如果不允许，并且想让他去到别的页面   next('/login')
*/

// 全局前置守卫
router.beforeEach((to, from, next) => {
  Nprogress.start();

  let nickname = sessionStorage.getItem('nickname');
  let list = ['/card', '/money', '/system'];

  if (list.indexOf(to.path) > -1 && !nickname) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next();
  }
})

// 全局后置守卫
router.afterEach((to, from) => {
  Nprogress.done();
})
export default router;
