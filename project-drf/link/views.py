from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet

from link.models import Link
from link.serializers import LinkModelSerializer


class LinkAPIView(ModelViewSet):
    queryset = Link.objects.all()  # queryset 指明该视图集在查询数据时使用的查询集
    serializer_class = LinkModelSerializer  # serializer_class 执行该视图在进行序列化或者反序列化时使用的序列化器