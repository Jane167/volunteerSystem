from rest_framework.views import APIView
from link.models import Link
from link.serializers import LinkModelSerializer
from utils.pagination import StandardPageNumberPagination
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

class LinkListAPIView(APIView):
    queryset = Link.objects.all().order_by('-date_joined')
    serializer_class = LinkModelSerializer

    def get(self, request, *args, **kwargs):
        """
        查询所有友情链接信息
        """
        response = {'success': True}
        link_list = Link.objects.all()
        paging_status = request.GET.get('pagingStatus')
        total = Link.objects.all().count()
        link_serializers = LinkModelSerializer(link_list, many=True, context={'request': request})
        pagination = StandardPageNumberPagination()
        pg_data = pagination.paginate_queryset(queryset=link_serializers.data, request=request, view=self)
        if paging_status == 'false':
            response['data'] = link_serializers.data
        else:
            response['data'] = pg_data
        response['data'] = pg_data
        response['total'] = total
        return Response(response)

    def post(self, request):
        """
        新增一条友情链接信息
        """

        # 获取前端传入请求体数据
        data = request.data.copy()

        # 创建序列化器进行反序列化操作
        serializer = LinkModelSerializer(data=data)
        # 调用序列化器的is_valid方法进行校验
        serializer.is_valid(raise_exception=True)
        # 调用序列化器的save方法进行执行create方法
        serializer.save()
        # 响应
        response = {
            'success': True,
            'data': {
                'message': 'success！'
            }
        }
        return Response(response)

    def delete(self, request, *args, **kwargs):

        """
        批量删除链接信息
        """
        delete_id = request.query_params.get('deleteId', None)
        if not delete_id:
            return Response({'message': '数据不存在！'})
        for i in delete_id.split(','):
            get_object_or_404(Link, pk=int(i)).delete()
        response = {
            'success': True,
            'data': {
                'message': '删除成功！'
            },
        }
        return Response(response)


class LinkDetailAPIView(APIView):

    def get(self, request, pk):
        """
        根据id查询单个链接信息
        """

        # 查询pk指定的模型对象
        try:
            link = Link.objects.get(id=pk)
        except Link.DoesNotExist:
            return Response({'success': True, 'data': {'message': '数据不存在！'}})
        # 创建序列化器进行序列化
        serializer = LinkModelSerializer(instance=link)
        # 响应
        response = {
            'success': True,
            'data': serializer.data,
        }
        return Response(response)

    def put(self, request, pk):
        """
        根据id修改指定友情链接信息
        """

        # 根据pk所指定的模型对象
        try:
            link = Link.objects.get(id=pk)
        except Link.DoesNotExist:
            return Response({'message': '数据不存在！'})
        # 获取前端传入的请求体数据
        data = request.data.copy()
        # 创建序列化器进行反序列化操作
        serializer = LinkModelSerializer(instance=link, data=data, partial=True)

        # 校验
        serializer.is_valid(raise_exception=True)
        serializer.save()
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
        根据id删除指定用户信息
        """

        # 查询pk所指定的模型对象
        try:
            link = Link.objects.get(id=pk)
        except Link.DoesNotExist:
            return Response({'message': '数据不存在！'})

        link.delete()

        # 响应
        response = {
            'success': True,
            'data': {
                'message': '删除成功！'
            },
        }
        return Response(response)

