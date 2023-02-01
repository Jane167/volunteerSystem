from rest_framework import serializers
from .models import Activity


class ActivityModelSerializer(serializers.ModelSerializer):
    # 创建序列化器，在view中会被调用
    create_time = serializers.DateTimeField(label='报名时间', required=False, format='%Y-%m-%d %H:%M:%S')
    start_date = serializers.DateField(label='开始日期', required=True, format='%Y-%m-%d')
    start_time = serializers.TimeField(label='开始时间', required=True, format='%H:%M:%S')

    class Meta:
        # models 指明该序列化器处理的字段从模型类Activity参考生成
        # fields 指明该序列化器包含模型类中的哪些字段，'all'代表包含所有字段
        model = Activity
        fields = '__all__'
