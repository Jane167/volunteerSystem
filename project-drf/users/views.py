from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework.response import Response
# Create your views here.
from rest_framework import viewsets
from rest_framework.views import APIView

from users.serializers import UserSerializer, GroupSerializer

class UserListAPIView(APIView):
	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer
	
	def get(self, request, *args, **kwargs):
		"""
		查询所有用户信息
		"""
		response = {'success': True}
		user_list = User.objects.all()
		total = User.objects.all().count()
		user_serializers = UserSerializer(user_list, many=True, context={'request': request})
		response['data'] = user_serializers.data
		response['total'] = total
		return Response(response)
	
	def post(self, request):
		"""
		新增一条用户信息
		"""
		
		# 获取前端传入请求体数据
		data = request.data
		# 创建序列化器进行反序列化操作
		serializer = UserSerializer(data=data)
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


class UserDetailAPIView(APIView):
	
	def get(self, request, pk):
		"""
		根据id查询单个用户信息
		"""
		# 查询pk指定的模型对象
		try:
			user = User.objects.get(id=pk)
		except User.DoesNotExist:
			return Response({'success': True, 'data': {'message': '数据不存在！'}})
		# 创建序列化器进行序列化
		serializer = UserSerializer(instance=user)
		# 响应
		response = {
			'success': True,
			'data': serializer.data,
		}
		return Response(response)
	
	def put(self, request, pk):
		"""
		根据id修改指定用户信息
		"""
		
		# 根据pk所指定的模型对象
		try:
			user = User.objects.get(id=pk)
		except User.DoesNotExist:
			return Response({'message': '数据不存在！'})
		# 获取前端传入的请求体数据
		# 创建序列化器进行反序列化操作
		serializer = UserSerializer(instance=user, data=request.data)
		
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
			user = User.objects.get(id=pk)
		except User.DoesNotExist:
			return Response({'message': '数据不存在！'})
		
		user.delete()
		
		# 响应
		response = {
			'success': True,
			'data': {
				'message': '删除成功！'
			},
		}
		return Response(response)


class GroupViewSet(viewsets.ModelViewSet):
	"""
	允许组查看或编辑的API路径
	"""
	queryset = Group.objects.all()
	serializer_class = GroupSerializer
