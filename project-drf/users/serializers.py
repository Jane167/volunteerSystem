from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
	
	# groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), many=True)
	
	class Meta:
		model = User
		fields = ('id', 'username', 'groups', 'first_name', 'last_name', 'email', 'last_login', 'date_joined')
		
	last_login = serializers.DateTimeField(label='上次登录时间', required=False, format='%Y-%d-%m %H:%M:%S')
	date_joined = serializers.DateTimeField(label='注册时间', required=False, format='%Y-%d-%m %H:%M:%S')
	groups = serializers.StringRelatedField(label='角色', many=True)


class GroupSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Group
		fields = ('id', 'name')
