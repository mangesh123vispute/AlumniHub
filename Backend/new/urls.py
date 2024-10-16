from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView
from .views import UserRegisterAPIView,ActivationEmailView, ActivateAccountView,ForgotPasswordAPIView,ResetPasswordAPIView
from .serializers import CustomTokenObtainPairSerializer


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


    # & rest_framework_simple jwt authentication 
    path('register/', UserRegisterAPIView.as_view(), name='registeruser'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('activate-email/', ActivationEmailView.as_view(), name='activate_email'),
    path('activate/<uidb64>/<token>/', ActivateAccountView.as_view(), name='activate_account'),
    path('forgot-password/', ForgotPasswordAPIView.as_view(), name='forgot_password'),
    path('reset-password/<uidb64>/<token>/', ResetPasswordAPIView.as_view(), name='reset_password'),
 
            
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
