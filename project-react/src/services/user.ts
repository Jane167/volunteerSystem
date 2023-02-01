import request from '@/utils/request';

// 获取用户列表
export async function getUserList(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}) {
  return request<API.UsersList>('/api/user/', {
    method: 'GET',
    params: params,
  });
}
