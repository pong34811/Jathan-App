import json
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from boards.models import Board, List, Task
from .serializers import ListSerializer, BoardSerializer, TaskSerializer
from rest_framework.filters import SearchFilter
from django.db.models import Count
from notifications.services import send_line_notify, send_email_notification

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
        message = (
            f"✅ Board Created Successfully!\n"
            f"📌 Title: {board.title}\n"
            f"📂 Details: {board.details if board.details else 'No details provided'}\n"
            f"⭐ Starred: {'Yes' if board.is_star else 'No'}\n"
            f"👤 Created by: {board.created_by}\n"
        )
        
        if self.request.user.is_notify_create_board:
            send_line_notify(self.request.user, message)
        if self.request.user.is_email_notify_create_board:
            send_email_notification(self.request.user, "Board Created", message, "is_email_notify_create_board")

    def perform_update(self, serializer):
        board = serializer.save(updated_by=self.request.user)
        message = (
            f"✏️ Board '{board.title}' has been updated!\n"
            f"📌 Title: {board.title}\n"
            f"📂 Details: {board.details if board.details else 'No details provided'}\n"
            f"⭐ Starred: {'Yes' if board.is_star else 'No'}\n"
            f"👤 Created by: {board.created_by}\n"
        )
        
        if self.request.user.is_notify_update_board:
            send_line_notify(self.request.user, message)
            
        if self.request.user.is_email_notify_update_board:
            send_email_notification(self.request.user, "Board Updated", message, "is_email_notify_update_board")

    def perform_destroy(self, instance):
        title = instance.title
        message = f"🗑️ Board '{title}' has been deleted!"
        
        if self.request.user.is_notify_delete_board:
            send_line_notify(self.request.user, message)
        if self.request.user.is_email_notify_delete_board:
            send_email_notification(self.request.user, "Board Deleted", message, "is_email_notify_delete_board")
        
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

from notifications.services import send_line_notify, send_email_notification

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
        message = (
            f"✅ Task Created Successfully!\n"
            f"📌 Title: {task.title}\n"
            f"📂 List: {task.list.title}\n"
            f"🎨 Color: {task.color}\n"
            f"🏷️ Tags: {', '.join(tag.name for tag in task.tags.all()) if task.tags.exists() else 'No tags'}\n"
            f"👤 Assigned by: {task.created_by if task.created_by and task.created_by else 'Unknown'}"
            f"📅 Creation Date: {task.created_at.strftime('%Y-%m-%d %H:%M:%S')}"
        )


        if self.request.user.is_notify_create_task:
            send_line_notify(self.request.user, message)
            
        if self.request.user.is_email_notify_create_task:
            send_email_notification(self.request.user, "Task Created", message, "is_email_notify_create_task")

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

        serializer.save(updated_by=self.request.user)
        message = (
            f"✏️ Task '{task.title}' has been updated!"
            f"📌 Title: {task.title}\n"
            f"📂 List: {task.list.title}\n"
            f"🎨 Color: {task.color}\n"
            f"🏷️ Tags: {', '.join(tag.name for tag in task.tags.all()) if task.tags.exists() else 'No tags'}\n"
            f"👤 Assigned by: {task.created_by if task.created_by and task.created_by else 'Unknown'}"

        )

        if self.request.user.is_notify_update_task:
            send_line_notify(self.request.user, message)
            
        if self.request.user.is_email_notify_update_task:
            send_email_notification(self.request.user, "Task Updated", message, "is_email_notify_update_task")

    def perform_destroy(self, instance):
        title = instance.title
        message = f"🗑️ Task '{title}' has been deleted!"
        

        if self.request.user.is_notify_delete_task:
            send_line_notify(self.request.user, message)    
            
        if self.request.user.is_email_notify_delete_task:
            send_email_notification(self.request.user, "Task Deleted", message, "is_email_notify_delete_task")

        instance.delete()
