from django.contrib.auth.models import User, Group
from django.http import HttpResponse
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from users.serializers import UserSerializer, GroupSerializer
from django.contrib.auth.hashers import make_password, check_password
from utils.pagination import StandardPageNumberPagination
import os
from utils.excel import *

class UserListAPIView(APIView):
	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer
	
	def get(self, request, *args):
		"""
		查询所有用户信息
		"""
		response = {'success': True}
		kwargs = {}
		# 根据用户名查询
		if request.GET.get("username", ""):
			kwargs.update({
				"username__contains": request.GET.get("username")
			})
		user_list = User.objects.filter(**kwargs)
		paging_status = request.GET.get('pagingStatus')
		total = User.objects.all().count()
		user_serializers = UserSerializer(user_list, many=True, context={'request': request})
		pagination = StandardPageNumberPagination()
		pg_data = pagination.paginate_queryset(queryset=user_serializers.data, request=request, view=self)
		if paging_status == 'false':
			response['data'] = user_serializers.data
		else:
			response['data'] = pg_data
		response['data'] = pg_data
		response['total'] = total
		return Response(response)
	
	def post(self, request):
		"""
		新增一条用户信息
		"""
		
		# 获取前端传入请求体数据
		data = request.data.copy()
		password_ = data["password"]
		data["password"] = make_password(password_)
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
	
	def delete(self, request, *args, **kwargs):
		"""
		批量删除
		"""
		delete_id = request.query_params.get('deleteId', None)
		if not delete_id:
			return Response({'message': '数据不存在！'})
		for i in delete_id.split(','):
			get_object_or_404(User, pk=int(i)).delete()
		response = {
			'success': True,
			'data': {
				'message': '删除成功！'
			},
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
		data = request.data.copy()
		if 'password' in data.keys():
			password_ = data['password']
			data['password'] = make_password(password_)
		
		# 创建序列化器进行反序列化操作
		serializer = UserSerializer(instance=user, data=data, partial=True)
		
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
	
	def patch(self, request, pk):
		"""
		根据id修改用户密码
		"""
		
		# 根据pk所指定的模型对象
		try:
			user = User.objects.get(id=pk)
		except User.DoesNotExist:
			return Response({'message': '数据不存在！'})
		# 获取前端传入的请求体数据
		data = request.data.copy()
		
		new_password = data['new_password']
		old_password = data['old_password']
		
		if check_password(old_password, user.password):
			new_data = {'password':  make_password(new_password)}
			# 创建序列化器进行反序列化操作
			serializer = UserSerializer(instance=user, data=new_data, partial=True)
		else:
			return Response({'message': '旧密码输入错误！'})
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


class LoginView(APIView):
	
	def post(self, request):
		"""
		登录接口
		"""
		username = request.data['username']
		password = request.data['password']
		print(password, username)
		user = User.objects.filter(username=username).first()
		if user and check_password(password, user.password):
			return Response({'status': 'ok', 'currentAuthority': username, 'user_id': user.id, 'type': 'account'})
		else:
			return Response({'status': 'failed', 'code': 400})


class UserExportExcelAPIView(APIView):
	
	def post(self, request):
		"""
		批量导出用户信息表
		"""
		
		user_codes = request.data.get("user_code")
		n = len(user_codes)
		
		# 表头字段
		head_data = [u'用户编号', u'用户名', u'电子邮箱', u'姓', u'名', u'上次登录时间', u'注册时间', u'角色']
		# 查询记录数据
		records = []
		for user_code in user_codes:
			if user_code != "":
				user_obj = User.objects.get(id=user_code)
				id = user_obj.id
				username = user_obj.username
				email = user_obj.email
				first_name = user_obj.first_name
				last_name = user_obj.last_name
				last_login = user_obj.last_login.strftime("%Y-%m-%d %H:%M:%S") if user_obj.last_login != None else ''
				date_joined = user_obj.date_joined.strftime("%Y-%m-%d %H:%M:%S")
				group = '管理员' if str(Group.objects.get(user=user_obj)) == 'manager' else '发布企业' if str(Group.objects.get(user=user_obj)) == 'company' else '普通用户'
				
				record = []
				record.append(id)
				record.append(username)
				record.append(email)
				record.append(first_name)
				record.append(last_name)
				record.append(str(last_login))
				record.append(str(date_joined))
				record.append(group)
				
			
			records.append(record)
		
		# 获取当前路径
		cur_path = os.path.abspath('.')
		# 设置生成文件所在路径
		download_url = cur_path + '\\upload\\'
		
		# 写入数据到excel中
		ret = write_to_excel(n, head_data, records, download_url)
		
		return HttpResponse(ret)
	def get(self, request):
		"""
		默认导出用户信息表
		"""

		users = User.objects.all()
		n = len(users)
		# 表头字段
		head_data = [u'用户编号', u'用户名', u'电子邮箱', u'姓', u'名', u'上次登录时间', u'注册时间', u'角色']
		# 查询记录数据
		records = []
		for user_obj in users:
			id = user_obj.id
			username = user_obj.username
			email = user_obj.email
			first_name = user_obj.first_name
			last_name = user_obj.last_name
			last_login = user_obj.last_login.strftime("%Y-%m-%d %H:%M:%S") if user_obj.last_login != None else ''
			date_joined = user_obj.date_joined.strftime("%Y-%m-%d %H:%M:%S")
			group = '管理员' if str(Group.objects.get(user=user_obj)) == 'manager' else '发布企业' if str(Group.objects.get(user=user_obj)) == 'company' else '普通用户'
			
			record = []
			record.append(id)
			record.append(username)
			record.append(email)
			record.append(first_name)
			record.append(last_name)
			record.append(str(last_login))
			record.append(str(date_joined))
			record.append(group)
		
			records.append(record)
		
		# 获取当前路径
		cur_path = os.path.abspath('.')
		# 设置生成文件所在路径
		download_url = cur_path + '\\upload\\'
		
		# 写入数据到excel中
		ret = write_to_excel(n, head_data, records, download_url)
		
		return HttpResponse(ret)


class DownloadAPIView(APIView):
	def post(self, request, offset):
		"""
		公共下载excel文件方法
		"""
		from django.http import StreamingHttpResponse
		def file_iterator(file_name, chunk_size=512):
			with open(file_name, 'rb') as f:
				while True:
					c = f.read(chunk_size)
					if c:
						yield c
					else:
						break
		
		# 显示在弹出对话框中的默认的下载文件名
		the_file_name = 'New-' + offset + '.xls'
		
		# 获取当前路径
		cur_path = os.path.abspath('.')
		# 设置生成文件所在路径
		download_url = cur_path + '\\upload\\'
		
		response = StreamingHttpResponse(file_iterator(download_url + 'New-' + offset + '.xls'))
		response['Content-Type'] = 'application/octet-stream'
		response['Content-Disposition'] = 'attachment;filename="{0}"'.format(the_file_name)
		
		return response

