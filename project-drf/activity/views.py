from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Activity
from .serializers import ActivityModelSerializer
from utils.pagination import StandardPageNumberPagination


class ActivityListAPIView(APIView):
    queryset = Activity.objects.all()  # queryset 指明该视图集在查询数据时使用的查询集
    serializer_class = ActivityModelSerializer  # serializer_class 执行该视图在进行序列化或者反序列化时使用的序列化器
    
    def get(self, request, *args, **kwargs):
        """
        查询所有活动信息
        """
        response = {'success': True}
        activity_list = Activity.objects.all()
        paging_status = request.GET.get("pagingStatus")
        for activity_item in activity_list:
            apply_activity = Activity.objects.get(id=activity_item.id)
            apply_person_num = apply_activity.apply_set.all().count()
            pass_person_num = apply_activity.apply_set.filter(apply_status=1).count()
            Activity.objects.filter(id=activity_item.id).update(
                apply_person_num=apply_person_num, pass_person_num=pass_person_num)
        total = activity_list.count()
        activity_serializers = ActivityModelSerializer(activity_list, many=True, context={'request': request})
        pagination = StandardPageNumberPagination()
        pg_data = pagination.paginate_queryset(queryset=activity_serializers.data, request=request, view=self)
        if paging_status == 'false':
            response['data'] = activity_serializers.data
        else:
            response['data'] = pg_data
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
    
    def delete(self, request, *args, **kwargs):
        """
        批量删除
        """
        delete_id = request.query_params.get('deleteId', None)
        if not delete_id:
            return Response({'message': '数据不存在！'})
        for i in delete_id.split(','):
            get_object_or_404(Activity, pk=int(i)).delete()
        response = {
            'success': True,
            'data': {
                'message': '删除成功！'
            },
        }
        return Response(response)
    
    
class ActivityDetailAPIView(APIView):
    def get(self, request, pk):
        """
        根据id查询单个活动信息
        """
        # 查询pk指定的模型对象
        try:
            activity = Activity.objects.get(id=pk)
            apply_person_num = activity.apply_set.all().count()
            pass_person_num = activity.apply_set.filter(apply_status=1).count()
            Activity.objects.filter(id=activity.id).update(apply_person_num=apply_person_num, pass_person_num=pass_person_num)
            
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
        serializer = ActivityModelSerializer(instance=activity, data=request.data, partial=True)
    
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