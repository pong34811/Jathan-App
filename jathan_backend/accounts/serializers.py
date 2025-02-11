from rest_framework import serializers
from .models import CustomUserModel

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = [
            'id', 'email', 'first_name', 'last_name', 'line_user_id',
            'is_notify_create_board', 'is_notify_update_board', 'is_notify_delete_board',
            'is_notify_create_task', 'is_notify_update_task', 'is_notify_delete_task',
            'is_active', 'is_staff', 'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login']
