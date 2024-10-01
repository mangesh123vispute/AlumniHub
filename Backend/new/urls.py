from django.contrib import admin
from django.urls import include, path
from newApp import alumniView as alumni
from newApp import collegeView as college
from django.conf import settings
from django.conf.urls.static import static
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView
from .views import UserRegisterAPIView, ForgotPasswordAPIView, ResetPasswordConfirmAPIView
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
    path(
        'accounts/',
        include('django.contrib.auth.urls')
        ),
    path(
        'accounts/signup/alumni/',
        alumni.SignupView.as_view(),
        name='alumni_signup'
        ),
     path(
        'accounts/signup/student/',
        alumni.StudentSignupView.as_view(),
        name='student_signup'
        ),
    path(
        'accounts/signup/college/',
        college.SignupView.as_view(),
        name='college_signup'
        ),

#^ Authentication


    # & rest_framework_simple jwt authentication 
    path('register/', UserRegisterAPIView.as_view(), name='registeruser'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
 
    path('api/forgot-password/', ForgotPasswordAPIView.as_view(), name='forgot_password'),
    path('api/reset-password-confirm/<uidb64>/<token>/', ResetPasswordConfirmAPIView.as_view(), name='reset_password_confirm'),

        
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
