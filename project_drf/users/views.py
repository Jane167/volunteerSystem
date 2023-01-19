from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework.response import Response
# Create your views here.
from rest_framework import viewsets
from rest_framework.views import APIView

from users.serializers import UserSerializer, GroupSerializer

class UserViewSet(APIView):
	# 	"""
	# 	允许用户查看或编辑的API路径
	# 	"""
	queryset = User.objects.all().order_by('-date_joined')
	serializer_class = UserSerializer
	
	def get(self, request, *args, **kwargs):
		response = {'success': True}
		user_list = User.objects.all()
		total = User.objects.all().count()
		user_serializers = UserSerializer(user_list, many=True, context={'request': request})
		response['data'] = user_serializers.data
		response['total'] = total
		return Response(response)


class GroupViewSet(viewsets.ModelViewSet):
	"""
	允许组查看或编辑的API路径
	"""
	queryset = Group.objects.all()
	serializer_class = GroupSerializer
