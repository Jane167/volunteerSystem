from django.contrib.auth import authenticate
from rest_framework import serializers
from user.models import User
from utils.exception import ParamsException
from django.contrib.auth.hashers import make_password
import re


# 注册序列化器
class UserSignupSerializer(serializers.ModelSeriallizer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    code = serializers.CharField(write_only=True)
    username = serializers.CharField()

    class Meta:
        model = User
        fields = [
            'id',
            'nickname',
            'username',
            'password',
            'confirm_password',
            'usertype',
            'code'
        ]

    default_error_message = {
        'code_error': '验证码不正确',
        'password_error': '两次输入密码不一致',
        'username_error': '手机号格式不正确',
    }

    def validate(self, attrs):
        if not re.match(r'^1[3-9]\d{9}$', attrs['username']):
            raise ParamsException(self.error_messages['username_error'], 422)
        if attrs.get('code') != '123':
            raise ParamsException(self.error_messages['code_error'], 422)
        if attrs.get('password') != attrs.get('confirm_password'):
            raise ParamsException(self.error_messages['password_error'], 422)
        del attrs['confirm_password']
        del attrs['code']
        attrs['password'] = make_password(attrs['password'])
        return attrs


# 登录接口序列化器
class UserSigninSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    default_error_messages = {
        'inactive_account': '用户已被禁用',
        'invalid_credentials': '用户名或密码错误',
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None

    def validate(self, attrs):
        self.user = authenticate(username=attrs.get("username"), password=attrs.get('password'))
        if self.user:
            if not self.user.is_active:
                raise ParamsException(self.error_messages['inactive_account'], 404)
            return attrs
        else:
            raise ParamsException(self.error_messages['invalid_credentials'], 404)
