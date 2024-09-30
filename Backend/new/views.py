# views using the adminlte template
from django.shortcuts import render,redirect, get_object_or_404
from .forms import UserRegistrationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.contrib import messages
from .forms import UserLoginForm
from .utils import send_otp
from datetime import datetime
from django.core.mail import send_mail
from django.conf import settings
import pyotp 
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.urls import reverse
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.permissions import AllowAny

User=get_user_model()



class ForgotPasswordAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        
        try:
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            current_site = get_current_site(request).domain
            reset_url = reverse('reset_password_confirm', kwargs={
                'uidb64': uid, 'token': token
            })
            reset_link = f"http://{current_site}{reset_url}"
            
            subject = 'Password Reset Request'
            message = render_to_string('website/authentication/reset_password_email.html', {
                'user': user,
                'reset_link': reset_link,
            })
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])
            
            return Response({'detail': 'Password reset email sent.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'detail': 'No user found with this email.'}, status=status.HTTP_404_NOT_FOUND)


class ResetPasswordConfirmAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if default_token_generator.check_token(user, token):
                new_password = request.data.get('new_password')
                confirm_password = request.data.get('confirm_password')

                if new_password and new_password == confirm_password:
                    user.set_password(new_password)
                    user.save()
                    return Response({'detail': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'detail': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'detail': 'Invalid link.'}, status=status.HTTP_400_BAD_REQUEST)





class UserRegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']
            role=request.data['role']
            
            try:
               
                new_user = User(
                    username=username,
                    email=email,
                )
                new_user.set_password(serializer.validated_data['password'])

                if(role=="Alumni"):
                    new_user.is_alumni=True
                elif(role=="Student"):
                    new_user.is_student=True
                else:
                    return Response(
                    {"detail": "Please select your role"},
                    status=status.HTTP_400_BAD_REQUEST
                )
                new_user.save()

                return Response(
                    {"detail": "Registration successful"},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                return Response(
                    {"detail": f"An error occurred: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR    
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



