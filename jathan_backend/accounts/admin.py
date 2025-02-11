from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import CustomUserModel

class UserAdminCustom(UserAdmin):
    # การตั้งค่า Fieldsets สำหรับการแสดงผลข้อมูลผู้ใช้
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "line_user_id")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
        (_("Notification settings for Board"), {
            "fields": (
                "is_notify_create_board", 
                "is_notify_update_board", 
                "is_notify_delete_board"
            )
        }),
        (_("Notification settings for Task"), {
            "fields": (
                "is_notify_create_task", 
                "is_notify_update_task", 
                "is_notify_delete_task"
            )
        }),
    )

    # การตั้งค่า Add Fieldsets สำหรับการเพิ่มข้อมูลผู้ใช้ใหม่
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email", 
                    "first_name", 
                    "last_name", 
                    "line_user_id", 
                    "password1", 
                    "password2", 
                    "is_notify_create_board",
                    "is_notify_update_board", 
                    "is_notify_delete_board",
                    "is_notify_create_task",
                    "is_notify_update_task", 
                    "is_notify_delete_task"
                )
            },
        ),
    )

    # การตั้งค่าฟิลด์ที่จะแสดงในหน้า list
    list_display = (
        "email", "first_name", "last_name", "line_user_id", 
        "is_notify_create_board", "is_notify_update_board", "is_notify_delete_board",
        "is_notify_create_task", "is_notify_update_task", "is_notify_delete_task", 
        "is_active", "is_staff", "date_joined", "last_login"
    )

    # การตั้งค่าให้สามารถค้นหาผู้ใช้ได้จากช่องต่างๆ
    search_fields = ("first_name", "last_name", "email", "line_user_id")

    # การตั้งค่าการเรียงลำดับ
    ordering = ("email",)

    # การตั้งค่า readonly_fields สำหรับไม่ให้แก้ไขฟิลด์บางตัว
    readonly_fields = ['date_joined', 'last_login']

admin.site.register(CustomUserModel, UserAdminCustom)
