from rest_framework import serializers
from .models import Apply
from activity.models import Activity
from activity.serializers import ActivityModelSerializer


class ApplyModelSerializer(serializers.Serializer):
    '''报名信息序列化器'''
    SEX_CHOICE = [
        (0, '未知'),
        (1, '男'),
        (2, '女')
    ]

    STATUS_CHOICE = [
        (0, '待审核'),
        (1, '已审核'),
        (2, '未通过')
    ]
    id = serializers.IntegerField(label='Id', read_only=True)
    name = serializers.CharField(label='姓名', max_length=50, required=True)
    age = serializers.IntegerField(label='年龄', required=False)
    sex = serializers.ChoiceField(choices=SEX_CHOICE, required=False)
    address = serializers.CharField(label='家庭住址', required=False)
    tel = serializers.CharField(label='联系方式', required=True)
    apply_status = serializers.ChoiceField(label='报名状态', choices=STATUS_CHOICE, required=True)
    apply_time = serializers.DateTimeField(label='报名时间', required=False, format='%Y-%d-%m %H:%M:%S')
    # belonging_activity = serializers.PrimaryKeyRelatedField(label="报名活动", required=True,
    #                                                         queryset=Activity.objects.all())
    belonging_activity = serializers.StringRelatedField(label='报名活动')
    
    # 局部全局钩子同Serializer类, 自定义校验手机号码方法
    def validate_tel(self, value):
        if (len(value) != 11):
            raise serializers.ValidationError('电话号码长度不对！')
        return value

    # 重写create方法
    def create(self, validated_data):
        return Apply.objects.create(**validated_data)

    # instance要被修改的对象，validated_data代表校验后用来改instance的数据
    def update(self, instance: Apply, validated_data):
        # 用户名不能被修改
        Apply.objects.filter(pk=instance.id).update(**validated_data)
        return instance
