import json
from rest_framework import serializers
from .models import Board, List, Task ,Tag


class BoardSerializer(serializers.ModelSerializer):
    list_count = serializers.IntegerField(read_only=True)
    task_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Board
        fields = ['id', 'title', 'details', 'is_star', 'list_count', 'task_count',
                  'created_at', 'updated_at', 'user', 'created_by', 'updated_by']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]

class TaskSerializer(serializers.ModelSerializer):
    list = serializers.PrimaryKeyRelatedField(queryset=List.objects.all())
    color = serializers.CharField(max_length=7, required=False, default="#FFFFFF")
    tags = TagSerializer(many=True, required=False)  # เพิ่ม Tags

    class Meta:
        model = Task
        fields = ["id", "list", "title", "description", "order", "color", "tags"]  # รวม tags

    def validate_description(self, value):
        try:
            if value:
                json.loads(value)
        except ValueError:
            raise serializers.ValidationError("Description must be a valid JSON format.")
        return value

    def validate(self, attrs):
        if not attrs.get("list"):
            raise serializers.ValidationError({"list": "The list field is required."})
        if not attrs.get("title"):
            raise serializers.ValidationError({"title": "The title field is required."})

        # ตรวจสอบว่าเป็นสีที่ถูกต้องในรูปแบบ HEX
        color = attrs.get('color', '#FFFFFF')
        if not color.startswith('#') or len(color) != 7:
            raise serializers.ValidationError({"color": "The color must be in the correct HEX format (e.g., #FFFFFF)."})
        return attrs

    def create(self, validated_data):
        tags_data = validated_data.pop("tags", [])
        task = Task.objects.create(**validated_data)
        for tag_data in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_data["name"])
            task.tags.add(tag)
        return task

    def update(self, instance, validated_data):
        tags_data = validated_data.pop("tags", [])
        instance = super().update(instance, validated_data)

        # อัปเดต Tags
        instance.tags.clear()
        for tag_data in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_data["name"])
            instance.tags.add(tag)

        return instance



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
