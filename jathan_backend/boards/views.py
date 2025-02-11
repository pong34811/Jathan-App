import json
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from boards.models import Board, List, Task
from .serializers import ListSerializer, BoardSerializer, TaskSerializer
from rest_framework.filters import SearchFilter
from django.db.models import Count
from notifications.services import send_line_notify

class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all().annotate(
        list_count=Count('lists'),
        task_count=Count('lists__tasks')
    )
    serializer_class = BoardSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['user', 'is_star']
    search_fields = ['title']
    
    def perform_create(self, serializer):
        board = serializer.save(created_by=self.request.user)
        if self.request.user.is_notify_create_board:  # ตรวจสอบฟิลด์แจ้งเตือน
            send_line_notify(self.request.user, f"📌 Board '{board.title}' has been created!")

    def perform_update(self, serializer):
        board = serializer.save(updated_by=self.request.user)
        if self.request.user.is_notify_update_board:  # ตรวจสอบฟิลด์แจ้งเตือน
            send_line_notify(self.request.user, f"✏️ Board '{board.title}' has been updated!")

    def perform_destroy(self, instance):
        title = instance.title
        if self.request.user.is_notify_delete_board:  # ตรวจสอบฟิลด์แจ้งเตือน
            send_line_notify(self.request.user, f"🗑️ Board '{title}' has been deleted!")
        instance.delete()



class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.prefetch_related('tasks')
    serializer_class = ListSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['board']
    def get_queryset(self):
        board_id = self.request.query_params.get('board', None)
        if board_id is not None:
            return self.queryset.filter(board_id=board_id).order_by('order')
        return self.queryset

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        list_id = self.request.query_params.get('list', None)
        if list_id is not None:
            return self.queryset.filter(list_id=list_id).order_by('order')
        return self.queryset.order_by('order')

    def perform_create(self, serializer):
        task = serializer.save(created_by=self.request.user, updated_by=self.request.user)
        
        # เช็คค่า is_notify_create_task ก่อนส่งการแจ้งเตือน
        if self.request.user.is_notify_create_task:
            send_line_notify(self.request.user, f"✅ Task '{task.title}' has been created!")

    def perform_update(self, serializer):
        task = self.get_object()
        if not task:
            raise NotFound(detail="Task not found")

        # Validate description as JSON
        description = serializer.validated_data.get('description', '')
        if description:
            try:
                json.loads(description)
            except ValueError:
                raise ValidationError("Description must be a valid JSON format.")

        # Save the updated task
        serializer.save(updated_by=self.request.user)
        
        # เช็คค่า is_notify_update_task ก่อนส่งการแจ้งเตือน
        if self.request.user.is_notify_update_task:
            send_line_notify(self.request.user, f"✏️ Task '{task.title}' has been updated!")

    def perform_destroy(self, instance):
        title = instance.title
        
        # เช็คค่า is_notify_delete_task ก่อนส่งการแจ้งเตือน
        if self.request.user.is_notify_delete_task:
            send_line_notify(self.request.user, f"🗑️ Task '{title}' has been deleted!")
        
        instance.delete()