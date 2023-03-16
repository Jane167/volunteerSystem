/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access() {
  // const { currentUser } = initialState ?? {};
  const role = sessionStorage.getItem('userType');
  return {
    /**
     * 活动管理的权限分配
     */
    canActivityManagement: role === 'manager' || role === 'company',
    canAddActivity: role === 'company',
    canUpdateActivity: role === 'company',
    canApplyActivity: role === 'common',
    canDeleteActivity: role === 'manager' || role === 'company',
  };
}
