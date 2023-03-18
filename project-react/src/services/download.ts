import request from '@/utils/request';

/**批量导出用户信息 POST /download/downloadId */
export async function download(downloadId?: number){
  return request('/api/download/' + downloadId + '/', {
    responseType: 'blob',
    method: 'POST',
  })
}