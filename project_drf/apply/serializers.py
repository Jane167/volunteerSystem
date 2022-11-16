from rest_framework import serializers
from .models import Apply


class ApplyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apply
        fields = '__all__'
        depth = 2
        read_only_fields = ['id']

    def validate_tel(self, value):
        if(value.length != 11):
            raise serializer.ValidationError('电话号码长度不对！')