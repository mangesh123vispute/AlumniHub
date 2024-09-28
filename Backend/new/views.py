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


User=get_user_model()


def forgot_password(request):
    return render(request, 'website/authentication/forgot-password.html')




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



