from rest_framework import serializers
from .models import Activity

# 创建序列化器，在view中会被调用
class ActivityModelSerializer(serializers.ModelSerializer):
    class Meta:
        # models 指明该序列化器处理的字段从模型类Activity参考生成
        # fields 指明该序列化器包含模型类中的哪些字段，'all'代表包含所有字段
        model = Activity
        fields = '__all__'