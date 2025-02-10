from django.contrib import admin
from .models import LineMessage

class LineMessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'task', 'line_user_id', 'line_status', 'text_message', 'date_message', 'send_notification_status')
    list_filter = ('line_status', 'text_message', 'date_message')
    search_fields = ('user__email', 'task__title', 'line_user_id', 'text_message')
    readonly_fields = ('send_notification_status',)

    def send_notification_status(self, obj):
        """ Custom method to display the notification status """
        if obj.line_status:
            return "Notification Sent"
        return "Notification Not Sent"
    send_notification_status.short_description = 'Notification Status'

    def save_model(self, request, obj, form, change):
        """ Overriding the save method to update notification status """
        if not obj.line_status:  # If the notification has not been sent yet, send it
            response = obj.send_notification()
            if response.get("status") == "Error":
                obj.line_status = False  # Keep as unsent if there's an error
            else:
                obj.line_status = True  # Mark as sent
        super().save_model(request, obj, form, change)

# Registering the model and the custom admin
admin.site.register(LineMessage, LineMessageAdmin)
