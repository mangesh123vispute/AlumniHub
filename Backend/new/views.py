from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer,ActivationEmailSerializer,ForgotPasswordSerializer
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
from django.utils.encoding import force_str
from django.shortcuts import render

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
            return render(request, 'account/activation_success.html', {'user': user,"message":"Account Activated Successfully!","message2":"Click here to login.","message3":"Login","url":"http://localhost:3000/login"})
            

        else:
            return render(request, 'account/activation_invalid.html')
           
            

    def send_confirmation_email(self, user):
        subject = "Account Activated"
        message = f"Hello {user.username},\n\nYour account has been successfully activated. You can now log in."
        from_email = settings.DEFAULT_FROM_EMAIL  # Make sure you have this set in your Django settings
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)


class ForgotPasswordAPIView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']

            try:
                user = User.objects.get(email=email)

                # Generate token and uid for password reset link
                reset_token = default_token_generator.make_token(user)
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))

                # Send password reset email
                self.send_password_reset_email(user, uidb64, reset_token)

                return Response({"detail": "Password reset email sent."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"detail": "No user found with this email."}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def send_password_reset_email(self, user, uidb64, token):
        subject = "Reset Your Password"
        message = "Please reset your password using the link below:"
        reset_link = f"http://localhost:3000/reset-password/{uidb64}/{token}/"

        html_message = f"""
            <p>{message}</p>
            <p><a href="{reset_link}">Reset Password</a></p>
        """

        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
            html_message=html_message
        )


class ResetPasswordAPIView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if default_token_generator.check_token(user, token):
                # Reset password logic here
                new_password = request.data.get('new_password')
                user.set_password(new_password)
                user.save()

                return Response({"detail": "Password reset successful."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist) as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)