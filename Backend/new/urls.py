from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView
from .views import UserRegisterAPIView,ActivationEmailView, ActivateAccountView,ForgotPasswordAPIView,ResetPasswordAPIView,SendActivationEmailView,AdminRegistrationView, AlumniRegistrationView,ForgotUsernameAPIView,ResetUsernameAPIView
from .serializers import CustomTokenObtainPairSerializer
from .views import CreateStaffUserView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    
urlpatterns = [
    path(
        'admin/',
        admin.site.urls
        ,
       
        ),
        
    path(
        '', include('newApp.urls')
    ),
   
  
#^ DRF Authentication   

    path('register-admin/', AdminRegistrationView.as_view(), name='register-admin'),
    path('register-alumni/', AlumniRegistrationView.as_view(), name='alumni-registration'),

    # & rest_framework_simple jwt authentication  path
    path('register/', UserRegisterAPIView.as_view(), name='registeruser'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    path('activate-email/', ActivationEmailView.as_view(), name='activate_email'),
    path('activate/<uidb64>/<token>/', ActivateAccountView.as_view(), name='activate_account'),

    path('forgot-password/', ForgotPasswordAPIView.as_view(), name='forgot_password'),
    path('reset-password/<uidb64>/<token>/', ResetPasswordAPIView.as_view(), name='reset_password'),

    path('forgot-username/', ForgotUsernameAPIView.as_view(), name='forgot_username'),
    path('reset-username/<uidb64>/<token>/', ResetUsernameAPIView.as_view(), name='reset_password'),
    
    path('send-activation-email/', SendActivationEmailView.as_view(), name='send_activation_email'),
    path('api/create-staff-user/', CreateStaffUserView.as_view(), name='create-staff-user'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

