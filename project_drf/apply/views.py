from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Apply                         # 导入对应的模型类
from .serializers import ApplyModelSerializer     # 导入对应的序列化器

# Create your views here.
class ApplyViewSet(ModelViewSet):
    queryset = Apply.objects.all()              # 指明查询集  
    serializer_class = ApplyModelSerializer       # 指明所使用的序列化器
