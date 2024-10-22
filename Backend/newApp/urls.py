from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static
from .views import HodPrincipalPostAPIView,GETAlumni,HodAuthorPostListView,AlumniPostAPIView,GETHODs,GETStudent,UserImageUploadView,AlumniAuthorPostListView




urlpatterns = [ 
    # ^DRF Routes

    # ^1.HOD 
    path('hodposts/', HodPrincipalPostAPIView.as_view(), name='hod-posts'),  
    path('hodposts/<int:pk>/', HodPrincipalPostAPIView.as_view(), name='hod-post-detail'),
    path('getalumni/', GETAlumni.as_view()),  # For list or creation
    path('getalumni/<int:pk>/', GETAlumni.as_view()),  # For specific alumni operations (GET spefific user )
    path('hodposts/author/<int:author_id>/', HodAuthorPostListView.as_view(), name='author-posts'),
    path('alumniPosts/author/<int:author_id>/', AlumniAuthorPostListView.as_view(), name='author-posts'),
    path('alumni/posts/', AlumniPostAPIView.as_view(), name='alumni-post-list'),
    path('alumni/posts/<int:pk>/', AlumniPostAPIView.as_view(), name='alumni-post-detail'),
    path('hods/', GETHODs.as_view(), name='all_hods'),  # For retrieving all HODs
    path('hods/<int:pk>/', GETHODs.as_view(), name='single_hod'),  # For retrieving a specific HOD
    path('students/', GETStudent.as_view(), name='get_all_students'),
    path('students/<int:pk>/', GETStudent.as_view(), name='get_student_by_id'),
    path('edit-hod-profile/<int:pk>/', views.update_hod_profile, name='edit_hod_profile'),
    path('edit-student-profile/<int:pk>/', views.update_student_profile, name='edit_student_profile'),
    path('edit-alumni-profile/<int:pk>/', views.update_alumni_profile, name='edit_alumni_profile'),
    path('update-image/<int:user_id>/', UserImageUploadView.as_view(), name='update-image'),
   
]+static(settings.MEDIA_URL, document_root=settings. MEDIA_ROOT)    
