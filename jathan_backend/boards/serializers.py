import json
from rest_framework import serializers
from .models import Board, List, Task


class BoardSerializer(serializers.ModelSerializer):
    list_count = serializers.IntegerField(read_only=True)
    task_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Board
        fields = ['id', 'title', 'details', 'is_star', 'list_count', 'task_count',
                  'created_at', 'updated_at', 'user', 'created_by', 'updated_by']


class TaskSerializer(serializers.ModelSerializer):
    list = serializers.PrimaryKeyRelatedField(queryset=List.objects.all())

    # เพิ่มฟิลด์ color
    color = serializers.CharField(
        max_length=7, required=False, default="#FFFFFF")  # เพิ่มค่าพื้นฐานเป็นสีขาว

    class Meta:
        model = Task
        fields = ["id", "list", "title", "description",
                  "order", "color"]  # รวมฟิลด์ color

    def validate_description(self, value):
        try:
            if value:
                json.loads(value)
        except ValueError:
            raise serializers.ValidationError(
                "Description must be a valid JSON format.")
        return value

    def validate(self, attrs):
        if not attrs.get("list"):
            raise serializers.ValidationError(
                {"list": "The list field is required."})
        if not attrs.get("title"):
            raise serializers.ValidationError(
                {"title": "The title field is required."})
        # ตรวจสอบว่าเป็นสีที่ถูกต้องในรูปแบบ HEX
        color = attrs.get('color', '#FFFFFF')
        if not color.startswith('#') or len(color) != 7:
            raise serializers.ValidationError(
                {"color": "The color must be in the correct HEX format (e.g., #FFFFFF)."})
        return attrs


class ListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = List
        fields = ['id', 'board', 'title', 'order', 'tasks']
        read_only_fields = ['id']

    def create(self, validated_data):
        return List.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.order = validated_data.get('order', instance.order)
        instance.save()
        return instance
