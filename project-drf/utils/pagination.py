from rest_framework.pagination import PageNumberPagination


# 分页配置
class StandardPageNumberPagination(PageNumberPagination):
	page_size = 10  # default page size
	page_query_param = 'current'
	page_size_query_param = 'pageSize'  # ?page=xx&size=??
	max_page_size = 100  # max page size