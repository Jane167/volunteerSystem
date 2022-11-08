from rest_framework import serializers
from .models import Apply


class ApplyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apply
        fields = '__all__'