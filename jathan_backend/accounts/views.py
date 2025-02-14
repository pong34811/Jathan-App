import requests
from rest_framework.views import APIView
from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import CustomUserModel
from .serializers import CustomUserSerializer
from rest_framework.generics import RetrieveUpdateAPIView
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from rest_framework.authentication import SessionAuthentication
from .models import CustomUserModel  # Import โมเดลของผู้ใช้



class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
    adapter_class = GoogleOAuth2Adapter
    callback_url = "https://janhai.space/"
    client_class = OAuth2Client
    
def email_confirmation(request, key):
    return redirect(f"https://janhai.space/dj-rest-auth/registration/account-confirm-email/{key}")

def reset_password_confirm(request, uid, token):
    return redirect(f"https://janhai.space/reset/password/confirm/{uid}/{token}")

class UserDetailView(RetrieveUpdateAPIView):
    queryset = CustomUserModel.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['user', 'is_star']

    def get_object(self):
        return self.request.user

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LineCallbackView(APIView): 
    permission_classes = []  # ไม่บังคับให้ Authentication

    def post(self, request):
        code = request.data.get('code')
        user_id = request.data.get('userId')  # รับ userId จาก frontend

        if not code or not user_id:
            return Response({'message': 'Authorization code and userId are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # แลกเปลี่ยน Authorization Code เป็น Access Token
            token_response = requests.post(
                'https://api.line.me/oauth2/v2.1/token',
                data={
                    'grant_type': 'authorization_code',
                    'code': code,
                    'redirect_uri': settings.LINE_REDIRECT_URI,
                    'client_id': settings.LINE_CLIENT_ID,
                    'client_secret': settings.LINE_CLIENT_SECRET
                }
            )
            token_data = token_response.json()

            if 'error' in token_data:
                return Response({'message': f"LINE API Error: {token_data.get('error_description', 'Unknown error')}"}, status=status.HTTP_400_BAD_REQUEST)

            # ดึงโปรไฟล์ LINE
            profile_response = requests.get(
                'https://api.line.me/v2/profile',
                headers={'Authorization': f"Bearer {token_data['access_token']}"}
            )
            profile_data = profile_response.json()

            if 'userId' not in profile_data:
                return Response({'message': 'Failed to get LINE user profile'}, status=status.HTTP_400_BAD_REQUEST)

            # ค้นหาและอัปเดต User
            user = CustomUserModel.objects.filter(id=user_id).first()
            if user:
                user.line_user_id = profile_data['userId']
                user.save()
                return Response({'success': True, 'message': 'LINE account connected successfully', 'line_user_id': profile_data['userId']})
            else:
                return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        except requests.exceptions.RequestException as e:
            return Response({'message': f'Error connecting to LINE API: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'message': f'Unexpected error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


