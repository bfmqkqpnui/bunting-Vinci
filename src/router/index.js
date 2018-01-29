import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import index from '@/components/index/index'

import loginComponent from '@/components/login/login'


import userComponent from '@/components/main/user/user'
import systemComponent from '@/components/main/system/system'
import changePwdComponent from '@/components/main/settings/changePassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: loginComponent
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
        keepAlive: true
      },
      component: index,
      //子路由
      children: [
        {
          path: 'user',
          component: userComponent
        },
        {
          path: 'system',
          component: systemComponent
        },
        {
          path: 'changePwd',
          component: changePwdComponent
        },
      ]
    }
  ]
})
