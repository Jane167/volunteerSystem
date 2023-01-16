from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Activity
from .serializers import ActivityModelSerializer

from rest_framework.filters import OrderingFilter  # 导包：排序的包
from django_filters.rest_framework import DjangoFilterBackend  # 导包：过滤的包
from rest_framework.pagination import PageNumberPagination  # 导包：分页的包


# Create your views here.

class StandarPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'page_num'
    max_page_size = 3


class ActivityViewSet(ModelViewSet):
    queryset = Activity.objects.all()  # queryset 指明该视图集在查询数据时使用的查询集
    serializer_class = ActivityModelSerializer  # serializer_class 执行该视图在进行序列化或者反序列化时使用的序列化器
    # pagination_class = StandarPageNumberPagination
    # filter_backends = (OrderingFilter, DjangoFilterBackend)
    # filter_fields = ['name', 'address']
    # ordering_fields = ('create_time')
