import request from '@/utils/request';

/** 查询链接列表 GET /api/link/ */
export async function getLinkList(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}) {
  return request<API.LinkList>('/api/link/', {
    method: 'GET',
    params: params,
  });
}

/** 新建链接信息 POST /api/link/ */
export async function addLink(options?: { [key: string]: any }) {
  return request<API.Response>('/api/link/', {
    method: 'POST',
    data: options,
  });
}

/** 更新链接信息 PUT /api/link/ */
export async function updateLink(options?: { [key: string]: any }, id?: number) {
  return request<API.Response>('/api/link/' + id + '/', {
    method: 'PUT',
    data: options,
  });
}

/** 获取单个链接信息 GET /api/link/ */
export async function getLink(id?: number) {
  return request<{ data: API.LinkListItem }>('/api/link/' + id + '/', {
    method: 'GET',
    // data: options,
  });
}

/** 删除链接信息 DELETE /api/link/ */
export async function removeLink(id?: number) {
  return request<API.Response>('/api/link/' + id + '/', {
    method: 'DELETE',
  });
}

/**默认导出链接信息 GET /api/link/export_excel */
export async function exportLink() {
  return request('/api/link/export_excel/', {
    method: 'GET',
  });
}

/** 批量删除链接信息 DELETE /api/link/ */
export async function batchRemoveLink(deleteId?: number[]) {
  return request<API.Response>('/api/link/?deleteId=' + deleteId, {
    method: 'DELETE',
  });
}

/**批量导出链接信息 POST /api/link/export_excel */
export async function batchExportLink(options?: { [key: string]: any }) {
  return request('/api/link/export_excel/', {
    method: 'POST',
    data: options,
  });
}
