from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

# 分页配置
class MyPageNumberPagination(PageNumberPagination):
    page_size = 10  # default page size
    page_size_query_param = 'size'  # ?page=xx&size=??
    max_page_size = 100  # max page size

    def get_paginated_response(self, data):
        return Response({

        })
