from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts.views import GoogleLogin, email_confirmation, reset_password_confirm ,UserDetailView,LineCallbackView 
from rest_framework import routers
from boards.views import BoardViewSet, ListViewSet, TaskViewSet



router = routers.DefaultRouter()
router.register(r'boards', BoardViewSet, basename='boards')
router.register(r'lists', ListViewSet, basename='lists')
router.register(r'tasks', TaskViewSet, basename='tasks')


urlpatterns = [
    path('api/', include(router.urls)),
    path("admin/", admin.site.urls),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/account-confirm-email/<str:key>/', email_confirmation),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('reset/password/confirm/<int:uid>/<str:token>', reset_password_confirm, name="password_reset_confirm"),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),  # รองรับ /user/1/
    path('line/callback/', LineCallbackView.as_view(), name='line-callback'),
]

# urlpatterns += [re_path(f'^.*', TemplateView.as_view(template_name = "index.html"))]