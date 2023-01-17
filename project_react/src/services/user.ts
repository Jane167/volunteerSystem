import request from '@/utils/request';

// 获取活动列表
export async function getUserList() {
  return request<API.UsersList>('/api/users/', {
    method: 'GET'
  });
}
