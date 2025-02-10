from rest_framework import serializers
from .models import CustomUserModel

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = ['id', 'email', 'first_name', 'last_name', 'line_user_id', 'is_active', 'is_staff', 'date_joined', 'last_login']
        read_only_fields = ['id', 'date_joined', 'last_login']
