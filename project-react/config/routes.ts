﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'icon-zhuye1-copy',
    component: './Welcome',
  },
  {
    name: '活动管理',
    icon: 'icon-icon_yingyongguanli',
    path: '/activityManagement',
    component: './ActivityTableList',
    access: 'canCompanyOrManagerDo',
  },
  {
    name: '活动列表',
    icon: 'icon-icon_yingyongguanli',
    path: '/activity-list',
    component: './ActivityTableList',
    access: 'canCommonDo',
  },
  {
    name: '报名管理',
    icon: 'icon-shenhexiangmu',
    path: '/applyManagement',
    component: './ApplyTableList',
    access: 'canCompanyOrManagerDo'
  },
  {
    name: '我的报名',
    icon: 'icon-shenhexiangmu',
    path: '/apply-list',
    component: './ApplyTableList',
    access: 'canCommonDo'
  },
  {
    name: 'user-management',
    icon: 'icon-yonghuguanli',
    path: '/userManagement',
    component: './UserManagement',
    access: 'canManagerDo',
  },
  {
    name: '友情链接',
    icon: 'icon-lianjie',
    path: '/link-list',
    component: './LinkManagement',
  },
  {
    name: 'personal-center',
    icon: 'icon-wode-wode',
    path: '/uCenter',
    component: './PersonalCenter',
  },
  {
    path: '/',
    redirect: '/user/login',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
