import requests
import threading
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
