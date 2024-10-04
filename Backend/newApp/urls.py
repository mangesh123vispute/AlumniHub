from django.urls import path
import newApp
from . import views, alumniView, collegeView
from django.conf import settings
from django.conf.urls.static import static
from .views import role_selection_view,role_selection_success,HodPrincipalPostAPIView

urlpatterns = [
    path(
        '',
        views.home,
        name='home'
        ),    
    path(
        'collegeprofile/<int:pk>/',
        collegeView.profile,
        name="college-profile"
        ),
    path(
        'alumniprofile/<int:pk>/',
        alumniView.profile,
        name="alumni-profile"
        ),
    path(
        'showalumni/',
        views.AlumniListView,
        name="show-alumni"
        ),
    path(
        'showcolleges/',
        views.CollegeListView,
        name='show-college'
        ),
    path(
        'college/<int:pk>/',
        views.CollegeDetailView.as_view(),
        name='college-detail'
        ),
    path(
        'alumni/<int:pk>/',
        views.AlumniDetailView.as_view(),
        name="alumni-detail"
         ),
    path(
        'college/query/',
        collegeView.PendingQueryView.as_view(),
        name="pending-query"
        ),
    path(
        'authenticate/<int:pk>/',
        collegeView.AlumniAuthenticationView.as_view(),
        name="alumni-authentication"
        ),
    path('AlumniPost', views.AlumniAddPost, name='AlumniPost'),
    path('EditAlumniPost/<int:id>', views.AlumniPostEdit, name='AlumniPostupdate'),
    path('AlumniPostlist', views.AlumniPostList, name='AlumniPostlist'),
    path('AlumniPostdelete/<int:id>', views.AlumniPostDelete, name='AlumniPostdelete'),
    path('follow/<int:id>/', views.Follow, name='follow'),
    path('AlumniPosts/<str:author_username>/', views.AlumniPosts, name='AlumniPosts'),
    path('followers/<int:id>/', views.Followers, name='followers'),
    path('following/<int:id>/', views.Following, name='following'),
    path('select-role/<int:user_id>/', role_selection_view, name='role_selection'),
    path('role-selection-success/', role_selection_success, name='role_selection_success'),
  
    # DRF Routes

    path('hodposts/', HodPrincipalPostAPIView.as_view(), name='hod-posts'),  
    path('hodposts/<int:pk>/', HodPrincipalPostAPIView.as_view(), name='hod-post-detail'),

  
   
]+static(settings.MEDIA_URL, document_root=settings. MEDIA_ROOT)    
