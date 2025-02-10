from django.conf import settings
from django.db import models
import requests
from datetime import timedelta
from django.utils import timezone


class LineMessage(models.Model):
    MESSAGE_TYPES = [
        ("modify", "Task Modified"),
        ("end_date", "Task End Date"),
        ("custom", "Custom Message")
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    task = models.ForeignKey('boards.Task', on_delete=models.CASCADE)
    line_user_id = models.CharField(max_length=50)
    line_status = models.BooleanField(default=False)
    text_message = models.CharField(max_length=50, choices=MESSAGE_TYPES)  # Added max_length here
    date_message = models.DateField()

    def get_token(self):
        # Store the token securely in your Django settings file
        return settings.LINE_NOTIFY_TOKEN

    def get_message_template(self):
        templates = {
            "modify": "สวัสดีครับ\n\nตอนนี้คุณได้ทำการเเก้ไขข้อมูล task",
            "end_date": "แจ้งเตือน! Task ของคุณกำลังจะครบกำหนดในอีก 2 วัน.",
            "custom": self.text_message
        }
        return templates.get(self.text_message, "ข้อความแจ้งเตือนปกติ")

    def should_send_notification(self):
        if self.text_message == "end_date":
            # Ensure using timezone-aware dates for consistency
            return timezone.localdate() == self.date_message - timedelta(days=2)
        return True

    def send_notification(self):
        if not self.should_send_notification():
            return {"status": "Not time to send notification yet"}

        url = "https://api.line.me/v2/bot/message/push"
        headers = {
            "Authorization": f"Bearer {self.get_token()}",
            "Content-Type": "application/json"
        }
        payload = {
            "to": self.line_user_id,
            "messages": [{"type": "text", "text": self.get_message_template()}]
        }

        try:
            response = requests.post(url, headers=headers, json=payload)
            response.raise_for_status()  # Raises an exception for 4xx/5xx responses
            return response.json()
        except requests.exceptions.RequestException as e:
            # Log the error properly and return a failure message
            return {"status": "Error", "message": str(e)}
