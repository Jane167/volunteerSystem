from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
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


class ActivityListAPIView(APIView):
    queryset = Activity.objects.all()  # queryset 指明该视图集在查询数据时使用的查询集
    serializer_class = ActivityModelSerializer  # serializer_class 执行该视图在进行序列化或者反序列化时使用的序列化器
    # pagination_class = StandarPageNumberPagination
    # filter_backends = (OrderingFilter, DjangoFilterBackend)
    # filter_fields = ['name', 'address']
    # ordering_fields = ('create_time')
    
    def get(self, request, *args, **kwargs):
        """
        询所有活动信息
        """
        response = {'success': True}
        activity_list = Activity.objects.all()
        total = activity_list.count()
        activity_serializers = ActivityModelSerializer(activity_list, many=True, context={'request': request})
        response['data'] = activity_serializers.data
        response['total'] = total
        return Response(response)
    
    def post(self, request):
        """
        新增一条活动信息
        """
        data = request.data
        serializer = ActivityModelSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'success': True,
            'data': {
                'message': '创建成功！'
            }
        })

class ActivityDetailAPIView(APIView):
    
    def get(self, request, pk):
        """
        根据id查询单个活动信息
        """
        # 查询pk指定的模型对象
        try:
            activity = Activity.objects.get(id=pk)
        except Activity.DoesNotExist:
            return Response({'success': True, 'data': {'message': '数据不存在！'}})
        # 创建序列化器进行序列化
        serializer = ActivityModelSerializer(instance=activity)
        # 响应
        response = {
            'success': True,
            'data': serializer.data,
        }
        return Response(response)


    
    def put(self, request, pk):
        """
        根据id修改指定活动信息
        """

        # 根据pk所指定的模型对象
        try:
            activity = Activity.objects.get(id=pk)
        except Activity.DoesNotExist:
            return Response({'message': '数据不存在！'})
        # 获取前端传入的请求体数据
        # 创建序列化器进行反序列化操作
        serializer = ActivityModelSerializer(instance=activity, data=request.data)
    
        # 校验
        serializer.is_valid(raise_exception=True)
        serializer.update()
        # 响应
        response = {
            'success': True,
            'data': {
                'message': '更新成功'
            },
        }
        return Response(response)

    
    def delete(self, request, pk):
        """
        根据id删除指定活动信息
        """

        # 查询pk所指定的模型对象
        try:
            activity = Activity.objects.get(id=pk)
        except Activity.DoesNotExist:
            return Response({'message': '数据不存在！'})
    
        activity.delete()
    
        # 响应
        response = {
            'success': True,
            'data': {
                'message': '删除成功！'
            },
        }
        return Response(response)