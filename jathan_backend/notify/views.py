from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import LineMessage

def send_notification_view(request, line_message_id):
    line_message = get_object_or_404(LineMessage, id=line_message_id)
    result = line_message.send_notification()
    return JsonResponse(result)
