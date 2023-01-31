from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import Apply  # 导入对应的模型类
from rest_framework.response import Response
from .serializers import ApplyModelSerializer  # 导入对应的序列化器


# Create your views here.
class ApplyListAPIView(APIView):
    queryset = Apply.objects.all()  # 指明查询集
    serializer_class = ApplyModelSerializer  # 指明所使用的序列化器
    
    def get(self, request, *args, **kwargs):
        """
        查询所有报名信息
        """
        response = {'success': True}
        apply_list = Apply.objects.all()
        total = apply_list.count()
        apply_serializers = ApplyModelSerializer(apply_list, many=True, context={'request': request})
        response['data'] = apply_serializers.data
        response['total'] = total
        return Response(response)

    def post(self, request):
        """
        新增一条报名信息
        """

        # 获取前端传入请求体数据
        data = request.data
        # 创建序列化器进行反序列化操作
        serializer = ApplyModelSerializer(data=data)
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

class ApplyDetailAPIView(APIView):

    def get(self, request, pk):
        """
        根据id查询指定报名信息
        """

        # 查询pk指定的模型对象
        try:
            apply = Apply.objects.get(id=pk)
        except Apply.DoesNotExist:
            return Response({'success': True, 'data': {'message': '数据不存在！'}})
        # 创建序列化器进行序列化
        serializer = ApplyModelSerializer(instance=apply)
        # 响应
        response = {
            'success': True,
            'data': serializer.data,
        }
        return Response(response)


    def put(self, request, pk):
        """
        根据id修改指定报名信息
        """
        # 根据pk所指定的模型对象
        try:
            apply = Apply.objects.get(id=pk)
        except Apply.DoesNotExist:
            return Response({'message': '数据不存在！'})
        # 获取前端传入的请求体数据
        # 创建序列化器进行反序列化操作
        serializer = ApplyModelSerializer(instance=apply, data=request.data)

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
        根据id删除指定报名信息
        """
        # 查询pk所指定的模型对象
        try:
            apply = Apply.objects.get(id=pk)
        except Apply.DoesNotExist:
            return Response({'message': '数据不存在！'})
        apply.delete()
        # 响应
        response = {
            'success': True,
            'data': {
                'message': '删除成功！'
            },
        }
        return Response(response)
