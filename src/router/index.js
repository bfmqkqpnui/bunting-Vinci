import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import index from '@/components/index/index'

import loginComponent from '@/components/login/login'

import userComponent from '@/components/main/user/user'

import systemComponent from '@/components/main/system/system'
import roleManagerComponent from '@/components/main/system/roleManager/roleManager'

import changePwdComponent from '@/components/main/settings/changePassword'
import managerComponent from '@/components/main/settings/managerInfo'

import customerServiceComponent from '@/components/main/customer/customerService'
import customerOperationComponent from '@/components/main/customer/customerOperation/customerOperation'

import authorityComponent from '@/components/main/authority/authority'
import authorOperationComponent from '@/components/main/authority/operation/authorOperation'

import deviceComponent from '@/components/main/device/device'
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
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: index,
      //子路由
      children: [
        {
          path: 'user',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: userComponent
        },
        {
          path: 'system',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: systemComponent
        },
        {
          path: '/index/system/roleManager',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: roleManagerComponent
        },
        {
          path: 'changePwd',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: changePwdComponent
        },
        {
          path: 'managerInfo',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: managerComponent
        },
        {
          path: 'acountManager',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: customerServiceComponent
        },
        {
          path: '/index/acountManager/acountOperation',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: customerOperationComponent
        },
        {
          path: 'authority',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: authorityComponent
        },
        {
          path: '/index/authority/operation',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: authorOperationComponent
        },
        {
          path: 'device',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: deviceComponent
        },

      ]
    }
  ]
})
