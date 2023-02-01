from rest_framework.pagination import PageNumberPagination


# 分页配置
class StandardPageNumberPagination(PageNumberPagination):
	page_size = 10  # default page size
	page_size_query_param = 'size'  # ?page=xx&size=??
	max_page_size = 100  # max page size
