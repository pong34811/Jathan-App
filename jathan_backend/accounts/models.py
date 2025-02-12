from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

# Create your models here.
class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("Email Address"), unique=True, max_length=255)
    first_name = models.CharField(_("First Name"), max_length=100)
    last_name = models.CharField(_("Last Name"), max_length=100, null=True, blank=True)
    line_user_id = models.CharField(_("LINE User ID"), max_length=50, null=True, blank=True)

    # ฟิลด์แจ้งเตือน Line
    is_notify_create_board = models.BooleanField(default=True)
    is_notify_update_board = models.BooleanField(default=True)
    is_notify_delete_board = models.BooleanField(default=True)
    
    is_notify_create_task = models.BooleanField(default=True)
    is_notify_update_task = models.BooleanField(default=True)
    is_notify_delete_task = models.BooleanField(default=True)
    
    # ฟิลด์แจ้งเตือน Email
    is_email_notify_create_board = models.BooleanField(default=True)
    is_email_notify_update_board = models.BooleanField(default=True)
    is_email_notify_delete_board = models.BooleanField(default=True)
    
    is_email_notify_create_task = models.BooleanField(default=True)
    is_email_notify_update_task = models.BooleanField(default=True)
    is_email_notify_delete_task = models.BooleanField(default=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['first_name']

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email