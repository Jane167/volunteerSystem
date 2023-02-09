import request from '@/utils/request';

/** 查询用户列表 GET /api/user/ */
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

/** 新建用户信息 POST /api/apply/ */
export async function addUser(options?: { [key: string]: any }) {
  return request<API.Response>('/api/user/', {
    method: 'POST',
    data: options,
  });
}

/** 更新用户信息 PUT /api/user/ */
export async function updateUser(options?: { [key: string]: any }, id?: number) {
  return request<API.Response>('/api/user/' + id + '/', {
    method: 'PUT',
    data: options,
  });
}

/** 获取单个用户信息 GET /api/user/ */
export async function getUser(id?: number) {
  return request<{ data: API.CurrentUser }>('/api/user/' + id + '/', {
    method: 'GET',
    // data: options,
  });
}

/** 删除用户信息 DELETE /api/user/ */
export async function removeUser(id?: number) {
  return request<API.Response>('/api/user/' + id + '/', {
    method: 'DELETE',
  });
}

/** 批量删除用户信息 DELETE /api/user/ */
export async function batchRemoveUser(deleteId?: number[]) {
  return request<API.Response>('/api/user/?deleteId=' + deleteId, {
    method: 'DELETE',
  });
}
