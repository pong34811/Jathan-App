from django.urls import path
from . import views

urlpatterns = [
    path('send_notification/<int:line_message_id>/', views.send_notification_view, name='send_notification'),
]
