from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from .models import CustomUserModel
from .serializers import CustomUserSerializer
from rest_framework.generics import RetrieveUpdateAPIView


from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000/"
    client_class = OAuth2Client
    


def email_confirmation(request, key):
    return redirect(f"http://localhost:3000/dj-rest-auth/registration/account-confirm-email/{key}")

def reset_password_confirm(request, uid, token):
    return redirect(f"http://localhost:3000/reset/password/confirm/{uid}/{token}")



class UserDetailView(RetrieveUpdateAPIView):
    queryset = CustomUserModel.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]  # ป้องกันการเข้าถึงข้อมูลของผู้ใช้อื่น

    def get_object(self):
        """Return the user object for the currently authenticated user"""
        return self.request.user