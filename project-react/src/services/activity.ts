import request from '@/utils/request';

// 获取活动列表
export async function getActivityList() {
  return request<API.ActivityList>('/api/activity/',{
    method: 'GET'
  });
}