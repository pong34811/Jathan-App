import requests
import threading
from django.core.mail import send_mail
from django.conf import settings

def send_line_notify(user, message):
    """ ส่งข้อความผ่าน LINE Messaging API แบบ Background """
    if user.line_user_id:
        headers = {
            "Authorization": f"Bearer {settings.LINE_BOT_ACCESS_TOKEN}",
            "Content-Type": "application/json"
        }
        data = {
            "to": user.line_user_id,  # ส่งถึง LINE User ID ของผู้ใช้
            "messages": [{"type": "text", "text": message}]
        }

        # ใช้ threading เพื่อให้ Django ไม่ต้องรอให้ LINE ส่งข้อความก่อน
        thread = threading.Thread(target=requests.post, args=("https://api.line.me/v2/bot/message/push",), kwargs={"headers": headers, "json": data})
        thread.start()

def send_email_notification(user, subject, message, email_flag):
    """ ส่งอีเมลแจ้งเตือนหากผู้ใช้เปิดการแจ้งเตือน """
    if getattr(user, email_flag, False) and user.email:
        thread = threading.Thread(target=send_mail, kwargs={
            "subject": subject,
            "message": message,
            "from_email": settings.EMAIL_HOST_USER,
            "recipient_list": [user.email],
            "fail_silently": False,
        })
        thread.start()