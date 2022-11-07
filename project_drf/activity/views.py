from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Activity
from .serializers import ActivityModelSerializer
# Create your views here.

class ActivityViewSet(ModelViewSet):
    queryset = Activity.objects.all()           # queryset 指明该视图集在查询数据时使用的查询集
    serializer_class = ActivityModelSerializer  # serializer_class 执行该视图在进行序列化或者反序列化时使用的序列化器