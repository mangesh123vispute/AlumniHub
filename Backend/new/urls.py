from django.contrib import admin
from django.urls import include, path
from newApp import alumniView as alumni
from newApp import collegeView as college
from django.conf import settings
from django.conf.urls.static import static
from . import views

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


        # urls using admin lte 
    path('login/', views.user_login, name='login'),
    path('register/', views.user_register, name='register'),
    path('logout/', views.user_logout, name='logout'),
    path('forgot-password/', views.forgot_password, name='forgot-password'),
    path('otp/', views.otp_view,name='otp'),
        
    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
