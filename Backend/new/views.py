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
from .serializers import UserLoginSerializer,UserRegistrationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

User=get_user_model()


def forgot_password(request):
    return render(request, 'website/authentication/forgot-password.html')


#  ^authentication 
# def user_register(request):
#     if request.method == 'POST':
#         form = UserRegistrationForm(request.POST)
#         if form.is_valid():
#             username = form.cleaned_data['username']
#             email = form.cleaned_data['email']

#             # Check if the username already exists
#             if User.objects.filter(username=username).exists():
#                 messages.error(request, 'Username already exists. Please choose a different username.')
#                 return render(request, 'website/authentication/register.html', {'form': form})

#             # Check if the email already exists
#             if User.objects.filter(email=email).exists():
#                 messages.error(request, 'Email already exists. Please use a different email address.')
#                 return render(request, 'website/authentication/register.html', {'form': form})

#             try:
#                 new_user = form.save(commit=False)
#                 new_user.set_password(form.cleaned_data['password'])
#                 new_user.save()
                
#                 user = authenticate(username=new_user.username, password=form.cleaned_data['password'])
#                 login(request, user)
#                 messages.success(request, 'You have successfully registered!')
#                 return redirect('/base')
#             except Exception as e:
#                 messages.error(request, f"An error occurred: {str(e)}")
#                 return render(request, 'website/authentication/register.html', {'form': form})
#         else:
#             # Adding form errors to messages
#             for field, errors in form.errors.items():
#                 for error in errors:
#                     messages.error(request, f"{field}: {error}")
#             return render(request, 'website/authentication/register.html', {'form': form})
#     else:
#         form = UserRegistrationForm()
#     return render(request, 'website/authentication/register.html', {'form': form})

# def user_register(request):
#     if request.method == 'POST':
#         form = UserRegistrationForm(request.POST)
#         if form.is_valid():
#             username = form.cleaned_data['username']
#             email = form.cleaned_data['email']

#             # Check if the username already exists
#             if User.objects.filter(username=username).exists():
#                 messages.error(request, 'Username already exists. Please choose a different username.')
#                 return render(request, 'website/authentication/register.html', {'form': form})

#             # Check if the email already exists
#             if User.objects.filter(email=email).exists():
#                 messages.error(request, 'Email already exists. Please use a different email address.')
#                 return render(request, 'website/authentication/register.html', {'form': form})

#             try:
#                 new_user = form.save(commit=False)
#                 new_user.set_password(form.cleaned_data['password'])
#                 new_user.is_active=False
#                 new_user.save()

#                 # Send OTP and redirect to OTP page
#                 send_otp(request, new_user)
#                 request.session['username'] = new_user.username
#                 messages.success(request, "Registration successful! OTP has been sent to your email.")
#                 return redirect('otp')  # Redirect to the OTP verification page

#             except Exception as e:
#                 messages.error(request, f"An error occurred: {str(e)}")
#                 return render(request, 'website/authentication/register.html', {'form': form})
#         else:
#             # Adding form errors to messages
#             for field, errors in form.errors.items():
#                 for error in errors:
#                     messages.error(request, f"{field}: {error}")
#             return render(request, 'website/authentication/register.html', {'form': form})
#     else:
#         form = UserRegistrationForm()
#     return render(request, 'website/authentication/register.html', {'form': form})




class UserRegisterAPIView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']

            try:
                # Create the new user
                new_user = User(
                    username=username,
                    email=email,
                    is_active=False  # Set the user to inactive until they verify via OTP
                )
                new_user.set_password(serializer.validated_data['password'])
                new_user.save()

                # Send OTP and store the username in the session
                send_otp(request, new_user)
                request.session['username'] = new_user.username
                return Response(
                    {"detail": "Registration successful! OTP has been sent to your email."},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                return Response(
                    {"detail": f"An error occurred: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR    
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def user_login(request):
#     if request.method == 'POST':
#         form = UserLoginForm(data=request.POST)
#         if form.is_valid():
#             username = form.cleaned_data.get('username')
#             password = form.cleaned_data.get('password')
#             user = authenticate(username=username, password=password)
#             if user is not None:
#                 if user.is_active:    
#                     send_otp(request,user)
#                     request.session['username'] = username
#                     messages.success(request, "OTP has been sent to your email.")
#                     return redirect('otp')  
#                 else:
#                     messages.error(request, "Your account is inactive. Please verify your email to activate your account.")
#             else:
#                 messages.error(request, "1.Invalid credentials. Please try again.")
#         else:
#             messages.error(request, "2.Invalid credentials. Please try again.")
#     else:
#         form = UserLoginForm()
        
#     return render(request, 'website/authentication/login.html', {'form': form})


class UserLoginAPIView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            
            user = authenticate(username=username, password=password)
            
            
            if user is not None:
                if user.is_active:
                    # Send OTP and handle session
                    send_otp(request, user)  # Assuming you have a function like this
                    request.session['username'] = username
                    return Response(
                        {"detail": "OTP has been sent to your email."},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {"detail": "Your account is inactive. Please verify your email to activate your account."},
                        status=status.HTTP_403_FORBIDDEN
                    )
            else:
                return Response(
                    {"detail": "Invalid credentials. Please try again."},
                    status=status.HTTP_401_UNAUTHORIZED
                )
        else:
            return Response(
                {"detail": "Invalid credentials. Please try again."},
                status=status.HTTP_400_BAD_REQUEST
            )

# def otp_view(request):
#     if request.method == 'POST':
#         otp = request.POST['otp']
#         username=request.session['username']
#         otp_secret_key=request.session['otp_secret_key']
#         otp_valid_until=request.session['otp_valid_date']

#         if otp_secret_key and otp_valid_until is not None:
#             valid_until=datetime.fromisoformat(otp_valid_until)
#             if valid_until > datetime.now():
#                 totp = pyotp.TOTP(otp_secret_key, interval=60)
#                 if totp.verify(otp):
#                     user = get_object_or_404(User, username=username)
#                     login(request, user)
              
#                      # Send email notification
#                     subject = 'Login Successful'
#                     message = 'You have successfully logged in to your account.'
#                     from_email = settings.EMAIL_HOST_USER
#                     to_email = user.email

#                     try:
#                         send_mail(subject, message, from_email, [to_email])
#                         print("Login notification email sent successfully!")
#                     except Exception as e:
#                         print(f"Failed to send email: {e}")

#                     # Clean up session data
#                     del request.session['otp_secret_key']
#                     del request.session['otp_valid_date']
#                     messages.success(request, "Login successful!")
#                     return redirect('/base')
#                 else:
#                     messages.error(request, "Invalid OTP. Please try again.")
#             else:
#                 messages.error(request, "OTP expired. Please try again.")
#         else:
#             messages.error(request, "Opps, something went wrong. Please try again.")

#     return render(request, 'website/authentication/otp.html',{})

class OtpVerifyAPIView(APIView):
    def post(self, request):
        otp = request.data.get('otp')
        username = request.session.get('username')
        otp_secret_key = request.session.get('otp_secret_key')
        otp_valid_until = request.session.get('otp_valid_date')

        if otp_secret_key and otp_valid_until:
            valid_until = datetime.fromisoformat(otp_valid_until)
            if valid_until > datetime.now():
                # Verify the OTP
                totp = pyotp.TOTP(otp_secret_key, interval=60)
                if totp.verify(otp):
                    # Get the user
                    user = get_object_or_404(User, username=username)
                    # Log the user in
                    login(request, user)

                    # Send email notification
                    subject = 'Login Successful'
                    message = 'You have successfully logged in to your account.'
                    from_email = settings.EMAIL_HOST_USER
                    to_email = user.email

                    try:
                        send_mail(subject, message, from_email, [to_email])
                    except Exception as e:
                        return Response(
                            {"detail": f"Failed to send email: {str(e)}"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR
                        )

                    # Clean up session data
                    del request.session['otp_secret_key']
                    del request.session['otp_valid_date']

                    return Response(
                        {"detail": "Login successful!"},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {"detail": "Invalid OTP. Please try again."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    {"detail": "OTP expired. Please request a new one."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            return Response(
                {"detail": "Something went wrong. Please try again."},
                status=status.HTTP_400_BAD_REQUEST
            )

# def user_logout(request):
#     if request.user.is_authenticated:
#         logout(request)
#         messages.success(request, 'You have successfully logged out!')
#     return redirect('/base')
class UserLogoutAPIView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response(
                {"detail": "You have successfully logged out!"},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": "You are not logged in."},
                status=status.HTTP_400_BAD_REQUEST
            )