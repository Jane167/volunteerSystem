/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access() {
  // const { currentUser } = initialState ?? {};
  const role = sessionStorage.getItem('userType');
  return {
    /**
     * 用户管理
     */
    canUserManagement: role === 'manager',

    canCommonDo: role === 'common',
    canCompanyDo: role === 'company',
    canManagerDo: role === 'manager',
    canCompanyOrManagerDo: role === 'company' || role === 'manager',
  };
}
