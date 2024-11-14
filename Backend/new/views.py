from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer,ActivationEmailSerializer,ForgotPasswordSerializer,ForgotUsernameSerializer
from .superuserCreateSerializers import AdminRegistrationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes,force_str
from rest_framework import status
from .utils import send_activation_email
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail,EmailMultiAlternatives
from django.conf import settings
import urllib.parse
from django.utils.encoding import force_str
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .createStaffSerializers import StaffUserSerializer
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError
from rest_framework.permissions import IsAdminUser
from  .AlumniRegisterSerializers import AlumniRegistrationSerializer
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import base64
from datetime import datetime

User=get_user_model()

class UserRegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']
            graduation_month = serializer.validated_data['graduation_month']
            graduation_year = serializer.validated_data['graduation_year']
            role=request.data['role']
            
            try:
                new_user = User(
                    username=username,
                    email=email,
                    graduation_month=graduation_month,
                    graduation_year=graduation_year,
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
                print(new_user)
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
            current_date = datetime.now()
            
            email = validated_data.get('email')

            try:
                user = User.objects.get(email=email)
                if user.is_active:
                    return Response({"detail": "Account is already activated for this Email"}, status=status.HTTP_400_BAD_REQUEST)
                
                if validated_data.get("username"):
                    new_username = validated_data.get("username")
                    # Check if a username exists and exclude the current user
                    if User.objects.filter(username=new_username).exclude(pk=user.pk).exists():
                        return Response(
                            {"detail": "Username is already taken. Please enter a different username"},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                if validated_data.get("email"):
                    new_email = validated_data.get("email")
                    # Check if an email exists and exclude the current user
                    if User.objects.filter(email=new_email).exclude(pk=user.pk).exists():
                        return Response(
                            {"detail": "Email is already in use. Please enter a different email."},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    
                role = validated_data.get('role')
                if role == "Alumni":
                    graduation_month = int(validated_data.get('graduation_month'))
                    graduation_year = int(validated_data.get('graduation_year'))
                    

                    # Check if graduation date is in the past
                    if (graduation_year < current_date.year) or (
                        graduation_year == current_date.year and graduation_month < current_date.month
                    ):
                        pass  # Graduation date is valid (in the past)
                    else:
                        return Response(
                            {"detail": "Graduation month and year must be in the past for Alumni."},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    
                elif role == "Student":
                    graduation_month =int(validated_data.get('graduation_month')) 
                    graduation_year = int(validated_data.get('graduation_year') )

                    # Check if graduation date is in the future for Students
                    if (graduation_year > current_date.year) or (
                        graduation_year == current_date.year and graduation_month > current_date.month
                    ):
                        pass  # Graduation date is valid (in the future)
                    else:
                        return Response(
                            {"detail": "Graduation month and year must be in the future for Students."},
                            status=status.HTTP_400_BAD_REQUEST
                        )


                # Send activation email
                activation_token = default_token_generator.make_token(user)
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
                # Pass all validated data to the email function
                send_activation_email(user, uidb64, activation_token, validated_data)

                return Response({"detail": "Activation email sent!"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"detail": "No user found with this email,Please register."}, status=status.HTTP_404_NOT_FOUND)

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
            print(data)
            if(data.get("password")):
              user.set_password(data.get('password'))

            if data.get("username"):
                new_username = data.get("username")
                # Check if a username exists and exclude the current user
                if User.objects.filter(username=new_username).exclude(pk=user.pk).exists():
                    return Response(
                        {"detail": "Username is already taken."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                else:
                    user.username = new_username

            if data.get("email"):
                new_email = data.get("email")
                # Check if an email exists and exclude the current user
                if User.objects.filter(email=new_email).exclude(pk=user.pk).exists():
                    return Response(
                        {"detail": "Email is already in use."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                else:
                    user.email = new_email

           
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
            if data.get("graduation_month") and data.get("graduation_year"):
                user.graduation_month = data.get("graduation_month")
                user.graduation_year = data.get("graduation_year")
                
            # Activate user
            user.is_active = True
            user.save()
          
            # Optionally, send a confirmation email
            self.send_confirmation_email(user)
            return render(request, 'account/activation_success.html', {'user': user,"message":"Account Activated Successfully!","message2":"Click here to login.","message3":"Login","url":"http://localhost:3000/login"})
            

        else:
           return render(request, 'account/activation_invalid.html', {
            'user': user,
            'message': "Account activation failed!",
             'message2': "The activation link is invalid or has expired.",
                'message3': "Request a new activation link.",
                 'url': "http://localhost:3000/activate_email"
                })

    def send_confirmation_email(self, user):
        """Sends an account activation confirmation email to the user."""
        subject = "Account Activated"
        email_from = settings.DEFAULT_FROM_EMAIL
        recipient_list = [user.email]

        message = f"Hello {user.username},\n\nYour account has been successfully activated. You can now log in."
        url="http://localhost:3000/login"
        context: dict[str, str] = {
            'message': message,
            'message3': "You can Login Now",
            'url':url
        }

        html_message = render_to_string('account/BaseEmail.html', context)
        plain_message = strip_tags(html_message)

        message = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=email_from,
            to=recipient_list
        )
        message.attach_alternative(html_message, "text/html")
        message.send()


# ! forgot password and username 
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
        """Sends a password reset email to the user."""
        subject = "Reset Your Password"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        reset_link = f"http://localhost:3000/reset-password/{uidb64}/{token}/"
        message = "Please reset your password using the link below:"

        context: dict[str, str] = {
            'message': message,
            'url': reset_link,
            'message3': "Reset Your Password"
        }

        html_message = render_to_string('account/BaseEmail.html', context)
        plain_message = strip_tags(html_message)

        message = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=email_from,
            to=recipient_list
        )
        message.attach_alternative(html_message, "text/html")
        message.send()


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


class ForgotUsernameAPIView(APIView):
    def post(self, request):
        serializer = ForgotUsernameSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']

            try:
                user = User.objects.get(email=email)

                # Generate token and uid for password reset link
                reset_token = default_token_generator.make_token(user)
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))

                # Send password reset email
                self.send_username_reset_email(user, uidb64, reset_token)

                return Response({"detail": "Username reset email sent."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"detail": "No user found with this email."}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def send_username_reset_email(self, user, uidb64, token):
    #     subject = "Reset Your Username"
    #     message = "Please reset your username using the link below:"
    #     reset_link = f"http://localhost:3000/reset-username/{uidb64}/{token}/"

    #     html_message = f"""
    #         <p>{message}</p>
    #         <p><a href="{reset_link}">Reset Username</a></p>
    #     """

    #     send_mail(
    #         subject,
    #         message,
    #         settings.EMAIL_HOST_USER,
    #         [user.email],
    #         fail_silently=False,
    #         html_message=html_message
    #     )
        
    def send_username_reset_email(self, user, uidb64, token):
        """Sends a username reset email to the user."""
        subject = "Reset Your Username"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        reset_link = f"http://localhost:3000/reset-username/{uidb64}/{token}/"
        message = "Please reset your username using the link below:"

        context: dict[str, str] = {
            'message': message,
            'url': reset_link,
            'message3': "Reset Your Username"
        }

        html_message = render_to_string('account/BaseEmail.html', context)
        plain_message = strip_tags(html_message)

        message = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=email_from,
            to=recipient_list
        )
        message.attach_alternative(html_message, "text/html")
        message.send()

class ResetUsernameAPIView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if default_token_generator.check_token(user, token):
                # Reset password logic here
                new_username = request.data.get('new_username')
                if(User.objects.filter(username=new_username).exists()):
                    return Response({"detail": "Username is already taken.Please Enter Other Username. "}, status=status.HTTP_400_BAD_REQUEST)
                user.username = new_username
                user.save()

                return Response({"detail": "Username reset successful."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist) as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class SendActivationEmailView(APIView):
    """
    API view to send activation email to inactive users.
    """

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({"detail": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, email=email)

        if user.is_active:
            return Response({"detail": "User account is already active."}, status=status.HTTP_400_BAD_REQUEST)

        # Call the send_activation_email function
        self.send_activation_email(user)
        
        return Response({"detail": "Activation email sent successfully."}, status=status.HTTP_200_OK)

    def send_activation_email(self, user):
        """Sends a simple activation email to the user."""
        subject = "Activate Your Account"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        encoded_email = base64.urlsafe_b64encode(user.email.encode()).decode()
        activation_link = f'http://localhost:3000/activate_email/{encoded_email}'
        context: dict[str, str] = {
            'user': user,
            'url': activation_link,
            'message': "Please activate your account by clicking the button below.",
            'message2': "Once activated, you'll have access to the full features of AlumniHub.",
            'message3': "Activate Your Account"
        }

        html_message = render_to_string('account/BaseEmail.html',context)
        plain_message=strip_tags(html_message)

        message=EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=email_from,
            to=recipient_list

        )
        message.attach_alternative(html_message,"text/html")
        message.send()



class CreateStaffUserView(APIView):
    permission_classes = [IsAuthenticated] 

    def post(self, request, *args, **kwargs):
        # Check if the user is superuser
        if not request.user.is_superuser:
            return Response(
                {"detail": "You do not have permission to perform this action."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if email already exists
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response(
                {"detail": "A user with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Proceed with staff user creation
        serializer = StaffUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                return Response(
                    {"detail": "Staff user created successfully.", "user_id": user.id},
                    status=status.HTTP_201_CREATED
                )
            except IntegrityError:
                return Response(
                    {"detail": "A profile for this user already exists."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminRegistrationView(APIView):
    def post(self, request, *args, **kwargs):

        if not request.user.is_superuser:
            return Response({'detail': 'You do not have permission to perform this action.'}, 
                            status=status.HTTP_403_FORBIDDEN)
        
        serializer = AdminRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        validated_data = serializer.validated_data
        branch = validated_data.pop('Branch', None)
        designation = validated_data.pop('designation', None)

        email = validated_data.get('email')
        username = validated_data.get('username')
        
        
        # Check if the email already exists
        if User.objects.filter(email=email).exists():
            return Response({
                'detail': 'Email already exists.',
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({
                'detail': 'Username already exists.',
            }, status=status.HTTP_400_BAD_REQUEST)

        
        user = User.objects.create(
            username=username,
            email=email,
            full_name=validated_data.get('full_name'),
            is_allowedToJoinAlumni=validated_data.get('is_allowedToJoinAlumni'),
            is_allowedToAccessSettings=validated_data.get('is_allowedToAccessSettings'),
            is_allowedToAddAdmin=validated_data.get('is_allowedToAddAdmin'),
            is_allowedToAccessLinkedinScrappingTab=validated_data.get('is_allowedToAccessLinkedinScrappingTab'),
            is_superuser=True,
            is_active=True,
        )
        user.set_password(validated_data.get('password'))
        user.save()

        # Set the branch if provided
        if branch:
            user.Branch = branch
            user.save()
        
        # Set the designation in the profile if created by signals
        if designation and hasattr(user, 'hodprincipalprofile'):
            user.hodprincipalprofile.designation = designation
            user.hodprincipalprofile.save()
        
        return Response({
            'detail': 'Admin registered successfully',
            'user_id': user.id,
            'username': user.username
        }, status=status.HTTP_201_CREATED)


class AlumniRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        # Check if the email or username already exists
        username = request.data.get('username')
        email = request.data.get('email')

        if User.objects.filter(username=username).exists():
            return Response({"detail": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"detail": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Proceed with serializer validation and saving the user if no errors found
        serializer = AlumniRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            subject = "AlumniHub Registration Successful"
            email_from = settings.DEFAULT_FROM_EMAIL
            recipient_list = [email]
            combined_message = (
             "Registration successful. Your account will be verified by the college authority. "
              "After verification, you will receive an email, and then you can log in."
                 )
            url="#"
            context: dict[str, str] = {
            'message': combined_message,
            'url': url,
            'message3': "Thank You for Registering"
              }
            html_message = render_to_string('account/BaseEmail.html', context)
            plain_message = strip_tags(html_message)

            message = EmailMultiAlternatives(
                subject=subject,
                body=plain_message,
                from_email=email_from,
                to=recipient_list
            )
            message.attach_alternative(html_message, "text/html")
            message.send()
            return Response({"detail": "Registration successful. Your account will be verified by college authority. After verification, you will receive an email, and then you can log in.."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




def custom_404_view(request, exception):
    return render(request, 'account/404.html', status=404)
