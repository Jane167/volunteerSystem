import request from '@/utils/request';

// 获取报名列表
export async function getApplyList() {
  return request<API.ApplyList>('/api/apply/',{
    method: 'GET'
  });
}