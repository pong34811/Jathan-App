from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import CustomUserModel

class UserAdminCustom(UserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "line_user_id")}),  # เพิ่ม line_user_id
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
    )
    add_fieldsets = (
        (
            None,
            {"classes": ("wide",), "fields": ("email", "first_name", "last_name", "line_user_id", "password1", "password2")},
        ),
    )
    list_display = ("email", "first_name", "last_name", "line_user_id", "is_staff")  # เพิ่ม line_user_id ที่นี่
    search_fields = ("first_name", "last_name", "email", "line_user_id")  # เพิ่ม line_user_id ในช่องค้นหา
    ordering = ("email",)
    readonly_fields = ['date_joined', 'last_login']

admin.site.register(CustomUserModel, UserAdminCustom)
