import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import index from '@/components/index/index'

import loginComponent from '@/components/login/login'

import userComponent from '@/components/main/user/user'
import userDetailsComponent from '@/components/main/user/details/userDetails'
import feedbackComponent from '@/components/main/user/feedback/feedback'
import feedbackDetailComponent from '@/components/main/user/feedback/feedbackDetail'

import systemComponent from '@/components/main/system/system'
import roleManagerComponent from '@/components/main/system/roleManager/roleManager'

import changePwdComponent from '@/components/main/settings/changePassword'
import managerComponent from '@/components/main/settings/managerInfo'

import customerServiceComponent from '@/components/main/customer/customerService'
import customerOperationComponent from '@/components/main/customer/customerOperation/customerOperation'

import authorityComponent from '@/components/main/authority/authority'
import authorOperationComponent from '@/components/main/authority/operation/authorOperation'

import deviceComponent from '@/components/main/device/device'
import deviceDataComponent from '@/components/main/device/deviceData/deviceData'

import reportDataComponent from '@/components/main/report/reportData'

import helpComponent from '@/components/main/help/help'

import appSearchPageComponent from '@/components/appSearchPage'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/appPage',
      name: 'appPage',
      component: appSearchPageComponent
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: loginComponent
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
          name : 'user',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: userComponent
        },
        {
          path: 'user/userDetails',
          name: 'userDetails',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: userDetailsComponent
        },
        {
          path: 'feedback',
          name:'feedback',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: feedbackComponent
        },
        {
          path: 'feedback/feedbackDetail',
          name:'feedbackDetail',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: feedbackDetailComponent
        },
        {
          path: 'system',
          name:'system',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: systemComponent
        },
        {
          path: 'system/roleManager',
          name: 'roleManager',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: roleManagerComponent
        },
        {
          path: 'changePwd',
          name: 'changePwd',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: changePwdComponent
        },
        {
          path: 'managerInfo',
          name: 'managerInfo',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: managerComponent
        },
        {
          path: 'acountManager',
          name: 'acountManager',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: customerServiceComponent
        },
        {
          path: '/index/acountManager/acountOperation',
          name: 'acountOperation',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: customerOperationComponent
        },
        {
          path: 'authority',
          name: 'authority',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: authorityComponent
        },
        {
          path: '/index/authority/operation',
          name : 'authorityOperation',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: authorOperationComponent
        },
        {
          path: 'device',
          name: 'device',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: deviceComponent
        },
        {
          path: 'device/deviceData',
          name: 'deviceData',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: deviceDataComponent
        },
        {
          path: 'report',
          name: 'report',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: reportDataComponent
        },
        {
          path: 'help',
          name: 'help',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: helpComponent
        },
      ]
    }
  ]
})
