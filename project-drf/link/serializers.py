from rest_framework import serializers
from .models import Link


class LinkModelSerializer(serializers.ModelSerializer):
    # 创建序列化器，在view中会被调用
    create_time = serializers.DateTimeField(label='创建时间', required=False, format='%Y-%m-%d %H:%M:%S')
    update_time = serializers.DateTimeField(label='更新时间', required=False, format='%Y-%m-%d %H:%M:%S')

    class Meta:
        # models 指明该序列化器处理的字段从模型类Link参考生成
        # fields 指明该序列化器包含模型类中的哪些字段，'all'代表包含所有字段
        model = Link
        fields = '__all__'
