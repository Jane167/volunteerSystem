// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  return {
    routes: {"1":{"path":"/user","layout":false,"id":"1"},"2":{"name":"login","path":"/user/login","file":"@/pages/User/Login/index.tsx","parentId":"1","id":"2"},"3":{"path":"/welcome","name":"welcome","icon":"icon-zhuye1-copy","file":"@/pages/Welcome.tsx","parentId":"ant-design-pro-layout","id":"3"},"4":{"path":"/admin","name":"admin","icon":"crown","parentId":"ant-design-pro-layout","id":"4"},"5":{"path":"/admin","redirect":"/admin/sub-page","parentId":"4","id":"5"},"6":{"path":"/admin/sub-page","name":"sub-page","file":"@/pages/Admin.tsx","parentId":"4","id":"6"},"7":{"name":"list.table-list","icon":"table","path":"/list","file":"@/pages/TableList/index.tsx","parentId":"ant-design-pro-layout","id":"7"},"8":{"name":"list.activity-table-list","icon":"icon-icon_yingyongguanli","path":"/activity-list","file":"@/pages/ActivityTableList/index.tsx","parentId":"ant-design-pro-layout","id":"8"},"9":{"name":"list.apply-table-list","icon":"icon-shenhexiangmu","path":"/apply-list","file":"@/pages/ApplyTableList/index.tsx","parentId":"ant-design-pro-layout","id":"9"},"10":{"name":"user-management","icon":"icon-guanliyuan_jiaoseguanli","path":"/userManagement","file":"@/pages/UserManagement/index.tsx","parentId":"ant-design-pro-layout","id":"10"},"11":{"name":"personal-center","icon":"icon-wode-wode","path":"/uCenter","file":"@/pages/PersonalCenter/index.tsx","parentId":"ant-design-pro-layout","id":"11"},"12":{"path":"/","redirect":"/welcome","parentId":"ant-design-pro-layout","id":"12"},"13":{"path":"*","layout":false,"file":"@/pages/404.tsx","id":"13"},"ant-design-pro-layout":{"id":"ant-design-pro-layout","path":"/","file":"@/.umi/plugin-layout/Layout.tsx","isLayout":true},"umi/plugin/openapi":{"path":"/umi/plugin/openapi","id":"umi/plugin/openapi","file":"D:/Users/Desktop/myCode/bs_volunteerManagementSys/project_react/src/.umi/plugin-openapi/openapi.tsx"}},
    routeComponents: {
'1': React.lazy(() => import( './EmptyRoute')),
'2': React.lazy(() => import(/* webpackChunkName: "p__User__Login__index" */'@/pages/User/Login/index.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__Welcome" */'@/pages/Welcome.tsx')),
'4': React.lazy(() => import( './EmptyRoute')),
'5': React.lazy(() => import( './EmptyRoute')),
'6': React.lazy(() => import(/* webpackChunkName: "p__Admin" */'@/pages/Admin.tsx')),
'7': React.lazy(() => import(/* webpackChunkName: "p__TableList__index" */'@/pages/TableList/index.tsx')),
'8': React.lazy(() => import(/* webpackChunkName: "p__ActivityTableList__index" */'@/pages/ActivityTableList/index.tsx')),
'9': React.lazy(() => import(/* webpackChunkName: "p__ApplyTableList__index" */'@/pages/ApplyTableList/index.tsx')),
'10': React.lazy(() => import(/* webpackChunkName: "p__UserManagement__index" */'@/pages/UserManagement/index.tsx')),
'11': React.lazy(() => import(/* webpackChunkName: "p__PersonalCenter__index" */'@/pages/PersonalCenter/index.tsx')),
'12': React.lazy(() => import( './EmptyRoute')),
'13': React.lazy(() => import(/* webpackChunkName: "p__404" */'@/pages/404.tsx')),
'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: "umi__plugin-layout__Layout" */'@/.umi/plugin-layout/Layout.tsx')),
'umi/plugin/openapi': React.lazy(() => import(/* webpackChunkName: "umi__plugin-openapi__openapi" */'D:/Users/Desktop/myCode/bs_volunteerManagementSys/project_react/src/.umi/plugin-openapi/openapi.tsx')),
},
  };
}
