from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer,ActivationEmailSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes,force_str
from rest_framework import status
from .utils import send_activation_email
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
import urllib.parse
User=get_user_model()

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
                new_user.is_active = True

                if(role=="Alumni"):
                    new_user.is_alumni=True
                    new_user.is_student=False
                elif(role=="Student"):
                    new_user.is_student=True
                    new_user.is_alumni=False
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



class ActivationEmailView(APIView):
    def post(self, request):
        serializer = ActivationEmailSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            
            email = validated_data.get('email')

            try:
                user = User.objects.get(email=email)
                if user.is_active:
                    return Response({"detail": "Your account is already activated."}, status=status.HTTP_400_BAD_REQUEST)

                # Send activation email
                activation_token = default_token_generator.make_token(user)
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
                
                # Pass all validated data to the email function
                send_activation_email(user, uidb64, activation_token, validated_data)

                return Response({"detail": "Activation email sent!"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"detail": "No user found with this email."}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

import urllib.parse

class ActivateAccountView(APIView):
    def get(self, request, uidb64, token):
        try:
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        # Validate token and user
        if user is not None and default_token_generator.check_token(user, token):
            # Get all passed query parameters (validated data)
            data = request.GET.dict()
           
            user.set_password(data.get('password'))
           
            if(data.get('role')=="Alumni"):
                user.is_alumni=True
                user.is_student=False
            elif(data.get('role')=="Student"):
                user.is_student=True
                user.is_alumni=False
            else:
                return Response(
                    {"detail": "Please select your role"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
            # Activate user
            user.is_active = True
            user.save()

            # Optionally, send a confirmation email
            self.send_confirmation_email(user)

            # Redirect to homepage or return success response
            return Response({"redirect_url": "http://localhost:3000/"}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Activation link is invalid!"}, status=status.HTTP_400_BAD_REQUEST)

    def send_confirmation_email(self, user):
        subject = "Account Activated"
        message = f"Hello {user.username},\n\nYour account has been successfully activated. You can now log in."
        from_email = settings.DEFAULT_FROM_EMAIL  # Make sure you have this set in your Django settings
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)
