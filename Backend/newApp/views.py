from django.shortcuts import  get_object_or_404
from django.shortcuts import get_object_or_404
from .models import User,AlumniPost,HodPrincipalPost,StudentProfile, AlumniProfile, HODPrincipalProfile 
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.urls import reverse
from .serializers import HodPrincipalPostSerializer,UserAlumniSerializer,AlumniPostSerializer,UserHODSerializer,UserStudentSerializer
from rest_framework.pagination import PageNumberPagination
from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
from rest_framework.exceptions import NotFound
from rest_framework import generics
from rest_framework.decorators import api_view
from .editserialisers import HODPrincipalProfileSerializer, UserSerializer, AlumniProfileSerializer, StudentProfileSerializer,UserImageUploadSerializer
from django.db.models import Q
from .allPostSerializers import AlumniGETPostSerializer, HodPrincipalGETPostSerializer
from .authenticateAlumniSerializers import InactiveAlumniSerializer
from rest_framework.exceptions import PermissionDenied
from django.core.mail import send_mail,EmailMultiAlternatives
from django.conf import settings
from .updateAlumniProfileSerializers import ProfileUpdateSerializer
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .editProfileSerializers import EditUserSerializer, EditStudentProfileSerializer,EditAlumniProfileSerializer

class HodPrincipalPostPagination(PageNumberPagination):
    page_size = 10  # Number of posts per page
    page_size_query_param = 'page_size'
    max_page_size = 100 

class HodPrincipalPostAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication for all actions

    # POST method: Create a new post
    def post(self, request,pk):
        
        user= User.objects.get(pk=pk)
        if not user.is_superuser and not user.is_active and not user.is_staff:
            return Response({"detail": "You do not have permission to create a post."}, status=status.HTTP_403_FORBIDDEN)

        serializer = HodPrincipalPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)  # Set the author to the current user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # GET method: Retrieve a single post if pk is given, else list all posts
    def get(self, request, pk=None):
        if pk is not None:
            # Get the specific post by pk
            post = get_object_or_404(HodPrincipalPost, pk=pk)
            serializer = HodPrincipalPostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # If pk is not provided, return paginated posts
        posts = HodPrincipalPost.objects.all()
        paginator = HodPrincipalPostPagination()
        paginated_posts = paginator.paginate_queryset(posts, request)
        serializer = HodPrincipalPostSerializer(paginated_posts, many=True)
        return paginator.get_paginated_response(serializer.data)

    # PUT method: Update an existing post
    def put(self, request, pk):
        try:
            post = HodPrincipalPost.objects.get(pk=pk)
        except HodPrincipalPost.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user is the author (HOD) of the post
        if post.author != request.user:
            return Response({"detail": "You do not have permission to update this post."}, status=status.HTTP_403_FORBIDDEN)

        serializer = HodPrincipalPostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE method: Delete an existing post
    def delete(self, request, pk):
        try:
            post = HodPrincipalPost.objects.get(pk=pk)
        except HodPrincipalPost.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user is the author (HOD) of the post
        if post.author != request.user:
            return Response({"detail": "You do not have permission to delete this post."}, status=status.HTTP_403_FORBIDDEN)

        post.delete()
        return Response({ "detail": "Post deleted successfully."} ,status=status.HTTP_204_NO_CONTENT)


class AlumniPostPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'
    max_page_size = 50 

class AlumniAuthorPostListView(generics.ListAPIView):
    serializer_class = AlumniPostSerializer
    pagination_class = AlumniPostPagination  

    def get_queryset(self):
        author_id = self.kwargs['author_id']
        return AlumniPost.objects.filter(author_id=author_id)

class HodPostPagination(PageNumberPagination):
    page_size = 5  
    page_size_query_param = 'page_size'
    max_page_size = 50  

class HodAuthorPostListView(generics.ListAPIView):
    serializer_class = HodPrincipalPostSerializer
    pagination_class = HodPostPagination  

    def get_queryset(self):
        author_id = self.kwargs['author_id']
        return HodPrincipalPost.objects.filter(author_id=author_id)



class AlumniPostAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication for all actions

    # POST method: Create a new post
    def post(self, request,pk):
        # Check if the user is a superuser
        user= User.objects.get(pk=pk)
        if not user.is_alumni:
            print("You are not an alumni",request.user)
            return Response({"detail": "You do not have permission to create a post."}, status=status.HTTP_403_FORBIDDEN)

        serializer = AlumniPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)  # Set the author to the current user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        if pk is not None:
            # Get the specific post by pk
            post = get_object_or_404(AlumniPost, pk=pk)
            serializer = AlumniPostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # If pk is not provided, return paginated posts
        posts = AlumniPost.objects.all()
        paginator = AlumniPostPagination()
        paginated_posts = paginator.paginate_queryset(posts, request)
        serializer = AlumniPostSerializer(paginated_posts, many=True)
        return paginator.get_paginated_response(serializer.data)

    # PUT method: Update an existing post
    def put(self, request, pk):
        try:
            post = AlumniPost.objects.get(pk=pk)
        except AlumniPost.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user is the author (alumni) of the post
        if post.author != request.user:
            return Response({"detail": "You do not have permission to update this post."}, status=status.HTTP_403_FORBIDDEN)

        serializer = AlumniPostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE method: Delete an existing post
    def delete(self, request, pk):
        try:
            post = AlumniPost.objects.get(pk=pk)
        except AlumniPost.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user is the author (alumni) of the post
        if post.author != request.user:
            return Response({"detail": "You do not have permission to delete this post."}, status=status.HTTP_403_FORBIDDEN)

        post.delete()
        return Response({ "detail": "Post deleted successfully."},status=status.HTTP_204_NO_CONTENT)
    
class GETAlumni(APIView):
    permission_classes = [IsAuthenticated]

    class AlumniPagination(PageNumberPagination):
        page_size = 10  # Number of results per page
        page_size_query_param = 'page_size'
        max_page_size = 100

    def get(self, request, *args, **kwargs):
        """
        Handle GET requests for retrieving all alumni or a specific instance by 'id' with optional filtering.
        """
        try:
            alumni_id = kwargs.get('pk', None)
            if alumni_id:
                alumni_user = get_object_or_404(User, id=alumni_id, is_alumni=True)
                if not hasattr(alumni_user, 'alumniprofile'):
                    AlumniProfile.objects.create(user=alumni_user)
                serializer = UserAlumniSerializer(alumni_user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Base query for alumni users
                alumni_users = User.objects.filter(is_alumni=True)

                # Filtering parameters
                filters = {
                    'full_name__icontains': request.query_params.get('full_name', None),
                    'Year_Joined__gte': request.query_params.get('Year_Joined_min', None),
                    'Year_Joined__lte': request.query_params.get('Year_Joined_max', None),
                    'Branch__icontains': request.query_params.get('Branch', None),
                    'skills__icontains': request.query_params.get('skills', None),
                    'graduation_year__gte': request.query_params.get('graduation_year_min', None),
                    'graduation_year__lte': request.query_params.get('graduation_year_max', None),
                    'alumniprofile__current_company_name__icontains': request.query_params.get('current_company_name', None),
                    'alumniprofile__previous_companies__icontains': request.query_params.get('previous_companies', None),
                    'alumniprofile__job_title__icontains': request.query_params.get('job_title', None),
                    'alumniprofile__current_city__icontains': request.query_params.get('current_city', None),
                    'alumniprofile__Education__icontains': request.query_params.get('Education', None),
                    'alumniprofile__current_country__icontains': request.query_params.get('current_country', None),
                    'alumniprofile__years_of_experience__gte': request.query_params.get('years_of_experience_min', None),
                    'alumniprofile__years_of_experience__lte': request.query_params.get('years_of_experience_max', None),
                    'alumniprofile__industry__icontains': request.query_params.get('industry', None),
                    'alumniprofile__preferred_contact_method__icontains': request.query_params.get('preferred_contact_method', None),
                }
                
                # Removing None values from filters
                filters = {key: value for key, value in filters.items() if value is not None}
                
                # Apply filters to the query
                alumni_users = alumni_users.filter(**filters)

                # Multi-field search (OR condition)
                search_query = request.query_params.get('search', None)
                if search_query:
                    alumni_users = alumni_users.filter(
                        Q(full_name__icontains=search_query) |
                        Q(skills__icontains=search_query) |
                        Q(alumniprofile__job_title__icontains=search_query) |
                        Q(alumniprofile__current_company_name__icontains=search_query)
                    )

                # Filter by multiple values for fields like skills or location
                skills = request.query_params.getlist('skills', None)
                cities = request.query_params.getlist('cities', None)
                
                if skills:
                    alumni_users = alumni_users.filter(skills__icontains='|'.join(skills))
                if cities:
                    alumni_users = alumni_users.filter(alumniprofile__current_city__in=cities)

                # Sorting functionality
                sort_by = request.query_params.get('sort_by', None)
                if sort_by:
                    alumni_users = alumni_users.order_by(sort_by)

                # Pagination
                paginator = self.AlumniPagination()
                paginated_alumni = paginator.paginate_queryset(alumni_users, request)
                serializer = UserAlumniSerializer(paginated_alumni, many=True)

                # Return paginated response
                return paginator.get_paginated_response(serializer.data)

        except ObjectDoesNotExist:
            raise NotFound("Alumni not found.")
        except DatabaseError:
            return Response({"error": "Database error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GETHODs(APIView):
    permission_classes = [IsAuthenticated]

    class HODPagination(PageNumberPagination):
        page_size = 10
        page_size_query_param = 'page_size'
        max_page_size = 100

    def get(self, request, *args, **kwargs):
        try:
            hod_id = kwargs.get('pk', None)
            if hod_id:
                # If 'pk' is provided, return a specific HOD
                hod_user = get_object_or_404(User, id=hod_id)
                # Check if the HOD profile exists, if not create a new profile
                if not hasattr(hod_user, 'hodprincipalprofile'):
                    HODPrincipalProfile.objects.create(user=hod_user)

                serializer = UserHODSerializer(hod_user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Base query for HOD users
                hod_users = User.objects.filter(hodprincipalprofile__isnull=False)

                # Filtering parameters (including additional fields from both User and HODPrincipalProfile models)
                filters = {
                    'full_name__icontains': request.query_params.get('full_name', None),
                    'Branch__icontains': request.query_params.get('Branch', None),
                    'hodprincipalprofile__designation__icontains': request.query_params.get('designation', None),
                }

                # Removing None values from filters
                filters = {key: value for key, value in filters.items() if value is not None}

                # Apply filters
                hod_users = hod_users.filter(**filters)

                # Multi-field search (OR condition) - extended for more fields
                search_query = request.query_params.get('search', None)
                if search_query:
                    hod_users = hod_users.filter(
                        Q(full_name__icontains=search_query) |
                        Q(Branch__icontains=search_query) |
                        Q(hodprincipalprofile__designation__icontains=search_query) 
                    )

                # Sorting functionality (optional)
                sort_by = request.query_params.get('sort_by', None)
                if sort_by:
                    hod_users = hod_users.order_by(sort_by)

                # Pagination
                paginator = self.HODPagination()
                paginated_hods = paginator.paginate_queryset(hod_users, request)
                serializer = UserHODSerializer(paginated_hods, many=True)
                return paginator.get_paginated_response(serializer.data)

        except ObjectDoesNotExist:
            raise NotFound("HOD not found.")
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GETStudent(APIView):
    permission_classes = [IsAuthenticated]

    class StudentPagination(PageNumberPagination):
        page_size = 10
        page_size_query_param = 'page_size'
        max_page_size = 100

    def get(self, request, *args, **kwargs):
        """
        Handle GET requests for retrieving all students or a specific instance by 'id' with optional filtering.
        """
        try:
            student_id = kwargs.get('pk', None)
            if student_id:
                student_user = get_object_or_404(User, id=student_id, is_student=True)
                if not hasattr(student_user, 'studentprofile'):
                    StudentProfile.objects.create(user=student_user)
                serializer = UserStudentSerializer(student_user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Base query for student users
                student_users = User.objects.filter(is_student=True)

                # Filtering parameters
                filters = {
                    'full_name__icontains': request.query_params.get('full_name', None),
                    'Branch__icontains': request.query_params.get('Branch', None),
                    'skills__icontains': request.query_params.get('skills', None),
                    'graduation_year__gte': request.query_params.get('graduation_year_min', None),
                    'graduation_year__lte': request.query_params.get('graduation_year_max', None),
                    'studentprofile__Heading__icontains': request.query_params.get('Heading', None),
                    'studentprofile__Education__icontains': request.query_params.get('Education', None),
                    'studentprofile__current_year_of_study__gte': request.query_params.get('current_year_of_study_min', None),
                    'studentprofile__current_year_of_study__lte': request.query_params.get('current_year_of_study_max', None),
                }

                # Remove None values from filters
                filters = {key: value for key, value in filters.items() if value is not None}
                
                # Apply filters
                student_users = student_users.filter(**filters)

                # Multi-field search (OR condition)
                search_query = request.query_params.get('search', None)
                if search_query:
                    student_users = student_users.filter(
                        Q(full_name__icontains=search_query) |
                        Q(skills__icontains=search_query) |
                        Q(studentprofile__Education__icontains=search_query)
                    )

                # Pagination
                paginator = self.StudentPagination()
                paginated_students = paginator.paginate_queryset(student_users, request)
                serializer = UserStudentSerializer(paginated_students, many=True)
                
                return paginator.get_paginated_response(serializer.data)
        
        except ObjectDoesNotExist:
            raise NotFound("Student not found.")
        except DatabaseError:
            return Response({"error": "Database error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#^ Edit profile views

@api_view(['PUT'])
def update_hod_profile(request, pk):
    try:
        hod_profile = HODPrincipalProfile.objects.get(user__id=pk)
    except HODPrincipalProfile.DoesNotExist:
        return Response({"detail": "HOD profile not found"}, status=status.HTTP_404_NOT_FOUND)

    user_data = request.data.get('user', {})
    profile_data = request.data.get('profile', {})

    user_serializer = UserSerializer(instance=hod_profile.user, data=user_data)
    profile_serializer = HODPrincipalProfileSerializer(instance=hod_profile, data=profile_data)

    user_valid = user_serializer.is_valid()
    profile_valid = profile_serializer.is_valid()

    if user_valid and profile_valid:
        user_serializer.save()
        profile_serializer.save()
        return Response({"detail": "HOD profile updated successfully"})

    return Response({"user_errors": user_serializer.errors, "profile_errors": profile_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_student_profile(request, pk):
    try:
        student_profile = StudentProfile.objects.get(user__id=pk)
    except StudentProfile.DoesNotExist:
        return Response({"detail": "Student profile not found"}, status=status.HTTP_404_NOT_FOUND)

    user_data = request.data.get('user', {})
    profile_data = request.data.get('profile', {})

    user_serializer = UserSerializer(instance=student_profile.user, data=user_data)
    profile_serializer = StudentProfileSerializer(instance=student_profile, data=profile_data)
    user_valid = user_serializer.is_valid()
    profile_valid = profile_serializer.is_valid()

    if user_valid and profile_valid:
        user_serializer.save()
        profile_serializer.save()
        return Response({"detail": "Student profile updated successfully"})
    
    return Response({"user_errors": user_serializer.errors, "profile_errors": profile_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_alumni_profile(request, pk):
    try:
        alumni_profile = AlumniProfile.objects.get(user__id=pk)
    except AlumniProfile.DoesNotExist:
        return Response({"detail": "Alumni profile not found"}, status=status.HTTP_404_NOT_FOUND)

    user_data = request.data.get('user', {})
    profile_data = request.data.get('profile', {})

    user_serializer = UserSerializer(instance=alumni_profile.user, data=user_data)
    profile_serializer = AlumniProfileSerializer(instance=alumni_profile, data=profile_data)

    user_valid = user_serializer.is_valid()
    profile_valid = profile_serializer.is_valid()

    if user_valid and profile_valid:
        user_serializer.save()
        profile_serializer.save()
        return Response({"detail": "Alumni profile updated successfully"})

    return Response({"user_errors": user_serializer.errors, "profile_errors": profile_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# ^edit image 

# class UserImageUploadView(APIView):
#     permission_classes = [IsAuthenticated]

#     def put(self, request, user_id, *args, **kwargs):
#         user = get_object_or_404(User, id=user_id)

#         serializer = UserImageUploadSerializer(user, data=request.data, partial=True) 

#         if serializer.is_valid():
#             serializer.save() 
#             return Response({"detail": "Image updated successfully"}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserImageUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, user_id, *args, **kwargs):
        user = get_object_or_404(User, id=user_id)
        
        # Check if the user already has an image (even if it's default) and delete it
        if user.Image and user.Image.name != 'default/def.jpeg':  # Ensure we don't delete the default image
            user.Image.delete(save=False)  # Delete the old image file from storage, but don't save yet

        serializer = UserImageUploadSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()  # This will save the new image to the Image field
            return Response({"detail": "Image updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserImageRetrieveView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, user_id, *args, **kwargs):
        user = get_object_or_404(User, id=user_id)

        if user.Image:
            image_url = request.build_absolute_uri(user.Image.url)
            return Response({"image_url": image_url}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "User has no image."}, status=status.HTTP_404_NOT_FOUND)
            

class PostListPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size' 
    max_page_size = 100 

# class PostListView(APIView):
#     pagination_class = PostListPagination

#     def get(self, request, *args, **kwargs):
#         alumni_posts = AlumniPost.objects.all()
#         hod_posts = HodPrincipalPost.objects.all()

#         alumni_serializer = AlumniGETPostSerializer(alumni_posts, many=True)
#         hod_serializer = HodPrincipalGETPostSerializer(hod_posts, many=True)

#         # Combine the posts and paginate
#         combined_posts = alumni_serializer.data + hod_serializer.data
        
#         # Paginate combined posts
#         paginator = self.pagination_class()
#         page = paginator.paginate_queryset(combined_posts, request)
        
#         return paginator.get_paginated_response(page)

class PostListView(APIView):
    pagination_class = PostListPagination

    def get(self, request, *args, **kwargs):
        # Base query for AlumniPost and HodPrincipalPost
        sort_order = request.query_params.get('sort_order', '-created_at')
        
        alumni_posts = AlumniPost.objects.filter(author__is_alumni=True,verified=True).order_by(sort_order)
        hod_posts = HodPrincipalPost.objects.filter(author__is_superuser=True).order_by(sort_order)


        # Filtering parameters
        filters = {     
            'author__full_name__icontains': request.query_params.get('full_name', None),
            'created_at__gte': request.query_params.get('created_at_min', None),
            'created_at__lte': request.query_params.get('created_at_max', None),
            'tag__icontains': request.query_params.get('tag', None),
            'title__icontains': request.query_params.get('title', None),
        }
        
       
        if request.query_params.get('is_alumni') is not None:
            filters['author__is_alumni'] = request.query_params.get('is_alumni').lower() == 'true'

        if request.query_params.get('is_superuser') is not None:
            filters['author__is_superuser'] = request.query_params.get('is_superuser').lower() == 'true'

        
        filters = {key: value for key, value in filters.items() if value is not None}

        # Apply filters to alumni and hod posts
        alumni_posts = alumni_posts.filter(**filters)
        hod_posts = hod_posts.filter(**filters)

        # Multi-field search (OR condition)
        search_query = request.query_params.get('search', None)
        if search_query:
            alumni_posts = alumni_posts.filter(
                Q(author__full_name__icontains=search_query) |
                Q(tag__icontains=search_query) |
                Q(title__icontains=search_query) |
                Q(content__icontains=search_query)
            )
            hod_posts = hod_posts.filter(
                Q(author__full_name__icontains=search_query) |
                Q(tag__icontains=search_query) |
                Q(title__icontains=search_query) |
                Q(content__icontains=search_query)
            )

        # Serialize the filtered posts
        alumni_serializer = AlumniGETPostSerializer(alumni_posts, many=True)
        hod_serializer = HodPrincipalGETPostSerializer(hod_posts, many=True)

        # Combine the posts and paginate
        combined_posts = alumni_serializer.data + hod_serializer.data
        combined_posts.sort(key=lambda x: x['created_at'], reverse=sort_order == '-created_at')
        
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(combined_posts, request)

        # Return paginated response
        return paginator.get_paginated_response(page)
    
    
class UnverifiedAlumniPostListView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = PostListPagination

    def get(self, request, *args, **kwargs):

        if not (
                (request.user.username == "Admin" and request.user.is_superuser) or 
                (request.user.is_superuser and request.user.is_allowedToAccessPostRequestTab)
            ):
                raise PermissionDenied("You do not have permission to access this resource.")

        
        sort_order = request.query_params.get('sort_order', '-created_at')
        unverified_alumni_posts = AlumniPost.objects.filter(
            author__is_alumni=True,
            verified=False
        ).order_by(sort_order)

        
        serializer = AlumniGETPostSerializer(unverified_alumni_posts, many=True)

      
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(serializer.data, request)

        
        return paginator.get_paginated_response(page)
    

class VerifyAlumniPostView(APIView):
    def post(self, request, post_id):
        
        if not (
            (request.user.username == "Admin" and request.user.is_superuser) or
            (request.user.is_superuser and request.user.is_allowedToAccessPostRequestTab)
        ):
            raise PermissionDenied("You do not have permission to access this resource.")
        
       
        try:
            post = AlumniPost.objects.get(id=post_id)
        except AlumniPost.DoesNotExist:
            raise NotFound("The specified post does not exist.")

       
        post.verified = True
        post.save()

        subject = "Your Post has been Verified"
        email_from = settings.DEFAULT_FROM_EMAIL
        recipient_list = [post.author.email] 
        combined_message = "Your post has been successfully verified by the AlumniHub."
        url = "#"
        context = {
            'message': combined_message,
            'url': url,
            'message3': "Thank you for your contribution!"
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


        return Response({"detail": "Post verified successfully."}, status=status.HTTP_200_OK)
    
class RejectAlumniPostView(APIView):
    def delete(self, request, post_id):
        # Check if the user has the required permissions
        if not (
            (request.user.username == "Admin" and request.user.is_superuser) or
            (request.user.is_superuser and request.user.is_allowedToAccessPostRequestTab)
        ):
            raise PermissionDenied("You do not have permission to access this resource.")
        
        # Get the post by ID
        try:
            post = AlumniPost.objects.get(id=post_id)
        except AlumniPost.DoesNotExist:
            raise NotFound("The specified post does not exist.")
        
        author_email = post.author.email
        # Delete the post
        post.delete()

        subject = "Your Post has been Rejected and Deleted"
        email_from = settings.DEFAULT_FROM_EMAIL
        recipient_list = [author_email]
        combined_message = "We appreciate your contribution to AlumniHub, but unfortunately, your recent post did not meet our criteria and has been removed; please reach out if you'd like more details or assistance."
        url = "#"
        context = {
            'message': combined_message,
            'url': url,
            'message3': "For further queries, contact support."
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


        return Response({"detail": "Post rejected and deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        

class InactiveAlumniListView(generics.ListAPIView):
    serializer_class = InactiveAlumniSerializer

    def get_queryset(self):
        # Check if the request user is a superuser
        if not self.request.user.is_superuser:
            raise PermissionDenied("You do not have permission to access this resource.")
        return User.objects.filter(is_alumni=True, is_active=False)


class AlumniActivationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def check_superuser(self, request):
        # Check if the user making the request is a superuser
        if not request.user.is_superuser:
            raise PermissionDenied("You do not have permission to perform this action.")

    # def send_activation_email(self, user):
    #     subject = "Your Alumni Account Has Been Activated !"
    #     message = "Hello {},\n\nYour alumni account has been successfully activated ,You can now Login to AlumniHub ! ".format(user.get_full_name())
    #     from_email = settings.EMAIL_HOST_USER
    #     recipient_list = [user.email]

    #     send_mail(subject, message, from_email, recipient_list)

    def send_activation_email(self, user):
        """Sends an activation confirmation email to the user."""
        subject = "Your Alumni Account Has Been Activated!"
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        # Prepare context for rendering the email template
        context: dict[str, str] = {
            'user': user.get_full_name(),
            'message': "Your alumni account has been successfully activated. You can now log in to AlumniHub and enjoy all its features.",
            'message3': "Log In to AlumniHub",
            'url':"http://localhost:3000/login"
        }

        # Render the email content using a template
        html_message = render_to_string('account/BaseEmail.html', context)
        plain_message = strip_tags(html_message)

        # Send email using EmailMultiAlternatives
        message = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=from_email,
            to=recipient_list
        )
        message.attach_alternative(html_message, "text/html")
        message.send()


    # def send_deletion_email(self, user):
    #     subject = "Your Alumni Account Has Been Deleted"
    #     message = "Hello {},\n\nWe regret to inform you that your alumni account has been successfully deleted. If you have any questions or concerns, please feel free to reach out to us.".format(user.get_full_name())
    #     from_email = settings.EMAIL_HOST_USER
    #     recipient_list = [user.email]

    #     send_mail(subject, message, from_email, recipient_list)
    def send_deletion_email(self, user):
        """Sends an email notification when the user's alumni account is deleted."""
        subject = "Your Alumni Account Has Been Deleted"
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        # Prepare context for rendering the email template
        context: dict[str, str] = {
            'user': user.get_full_name(),
            'message': "We regret to inform you that your alumni account has been successfully deleted. If you have any questions or concerns, please feel free to reach out to us.",
            'message3': "Contact Us",
            'url': "http://localhost:3000/#contact"
        }

        # Render the email content using a template
        html_message = render_to_string('account/BaseEmail.html', context)
        plain_message = strip_tags(html_message)

        # Send email using EmailMultiAlternatives
        message = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=from_email,
            to=recipient_list
        )
        message.attach_alternative(html_message, "text/html")
        message.send()


    def put(self, request, user_id):
        self.check_superuser(request)
        user = get_object_or_404(User, id=user_id)

        # Check if the user is an alumni
        if not user.is_alumni:
            return Response({"detail": "User is not an alumni."}, status=status.HTTP_400_BAD_REQUEST)

        # Activate the alumni user
        user.is_active = True
        user.save()
        self.send_activation_email(user)
        return Response({"detail": "Alumni account activated successfully."}, status=status.HTTP_200_OK)

    def delete(self, request, user_id):
        self.check_superuser(request)
        user = get_object_or_404(User, id=user_id)

        # Check if the user is an alumni
        if not user.is_alumni:
            return Response({"detail": "User is not an alumni."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Delete the alumni user
        user.delete()
        self.send_deletion_email(user)

        return Response({"detail": "Alumni account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class AcceptAllAlumni(APIView):
    permission_classes = [IsAuthenticated]

    def send_activation_email(self, user):
        subject = "Your Alumni Account Has Been Activated!"
        message = "Hello {},\n\nYour alumni account has been successfully activated. You can now log in to AlumniHub!".format(user.get_full_name())
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [user.email]
        print("I am gettting called")

        send_mail(subject, message, from_email, recipient_list)

    def send_deletion_email(self, user):
        subject = "Your Alumni Account Has Been Deleted"
        message = "Hello {},\n\nWe regret to inform you that your alumni account has been successfully deleted. If you have any questions or concerns, please feel free to reach out to us.".format(user.get_full_name())
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)

    def put(self, request, *args, **kwargs):
        # Check if the requesting user is a superuser
        if not request.user.is_superuser:
            return Response(
                {"error": "You do not have permission to perform this action."},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            # Filter for inactive alumni
            inactive_alumni = User.objects.filter(is_alumni=True, is_active=False)

            # Update is_active status for each matching user and collect activated users
            updated_count = inactive_alumni.update(is_active=True)
            activated_users = inactive_alumni.values_list('id', flat=True)  # Get the IDs of activated users

            # Send activation emails to all activated users
            for user_id in activated_users:
                user = User.objects.get(id=user_id)
                self.send_activation_email(user)

            return Response(
                {
                    "message": f"{updated_count} alumni have been activated successfully."
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {
                    "error": "An error occurred while activating alumni.",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )          

class UpdateAlumniProfileView(APIView):
    def post(self, request, user_id):
        # Retrieve the user based on user_id
        user = get_object_or_404(User, id=user_id)
        
        # Check if the user is an alumni
        if not user.is_alumni:
            return Response(
                {"error": "User is not an alumni."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Deserialize and validate input data
        serializer = ProfileUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Update the profile based on graduation date
        graduation_date = serializer.validated_data.get('graduation_date')
        updated_user = serializer.update_profile(user, graduation_date)

        return Response(
            {"message": "Profile updated successfully.", "user": updated_user.id},
            status=status.HTTP_200_OK
        )


class UserDetailView(APIView):
    """
    API view to retrieve username, email, graduation_year, and graduation_month based on the provided email.
    """
    def post(self, request):
        email = request.data.get('email')
        
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the user or return a 404 response if not found
        user = get_object_or_404(User, email=email)

        role="None"
        if user.is_alumni:
            role="Alumni"
        elif user.is_student:
            role="Student"

        # Prepare the response data
        user_data = {
            'username': user.username,
            'email': user.email,
            'graduation_year': user.graduation_year,
            'graduation_month': user.graduation_month,
            'role':role
        }

        return Response(user_data, status=status.HTTP_200_OK)


class UpdateStudentProfileAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, user_id,username,graduation_year):
        try:
            # Fetch the user and their related student profile
            user = User.objects.get(id=user_id, is_student=True)

            # Cross-check provided data with the user's data
            if user.username != username  or str(user.graduation_year) != str(graduation_year):
                return Response({'detail': 'You are not authorized to access this data.'}, status=status.HTTP_403_FORBIDDEN)
            
            student_profile = StudentProfile.objects.get(user=user)

            # Serialize the data
            user_serializer = EditUserSerializer(user)
            student_profile_serializer = EditStudentProfileSerializer(student_profile)

            return Response({
                'user': user_serializer.data,
                'student_profile': student_profile_serializer.data
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'detial': 'User not found or is not a student'}, status=status.HTTP_404_NOT_FOUND)
        except StudentProfile.DoesNotExist:
            return Response({'detail': 'Student profile not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, user_id,username,graduation_year):
        try:
            # Fetch the user and their related student profile
            user = User.objects.get(id=user_id, is_student=True)

            # Cross-check provided data with the user's data
            if user.username != username  or str(user.graduation_year) != str(graduation_year):
                return Response({'detail': 'You are not authorized to access this data.'}, status=status.HTTP_403_FORBIDDEN)

            existing_user = User.objects.filter(email=request.data.get('email')).exclude(id=user_id).first()
            if existing_user:
                return Response({'detail': 'This email is already in use by another user.'}, status=status.HTTP_400_BAD_REQUEST)
            
            mobile_number = request.data.get('mobile')
            if mobile_number and len(mobile_number) > 10:
                return Response({'detail': 'Mobile number should not be greater than 10 digits.'}, status=status.HTTP_400_BAD_REQUEST)

            
            student_profile = StudentProfile.objects.get(user=user)

            # Partially update user and student profile
            user_serializer = EditUserSerializer(user, data=request.data, partial=True)
            student_profile_serializer = EditStudentProfileSerializer(student_profile, data=request.data, partial=True)

            if user_serializer.is_valid() and student_profile_serializer.is_valid():
                user_serializer.save()
                student_profile_serializer.save()
                return Response({
                    'user': user_serializer.data,
                    'student_profile': student_profile_serializer.data
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'user_errors': user_serializer.errors,
                    'student_profile_errors': student_profile_serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'detail': 'User not found or is not a student'}, status=status.HTTP_404_NOT_FOUND)
        except StudentProfile.DoesNotExist:
            return Response({'detail': 'Student profile not found'}, status=status.HTTP_404_NOT_FOUND)


class UpdateAlumniProfileAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, user_id, username, graduation_year):
        try:
            # Fetch the user and their related alumni profile
            user = User.objects.get(id=user_id, is_alumni=True)

            # Cross-check provided data with the user's data
            if user.username != username  or str(user.graduation_year) != str(graduation_year):
                return Response({'detail': 'You are not authorized to access this data.'}, status=status.HTTP_403_FORBIDDEN)

            alumni_profile = AlumniProfile.objects.get(user=user)

            # Serialize the data
            user_serializer = EditUserSerializer(user)
            alumni_profile_serializer = EditAlumniProfileSerializer(alumni_profile)

            return Response({
                'user': user_serializer.data,
                'alumni_profile': alumni_profile_serializer.data
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'detail': 'User not found or is not an alumni'}, status=status.HTTP_404_NOT_FOUND)
        except AlumniProfile.DoesNotExist:
            return Response({'detail': 'Alumni profile not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, user_id, username, graduation_year):
        try:
            # Fetch the user and their related alumni profile
            user = User.objects.get(id=user_id, is_alumni=True)

            # Cross-check provided data with the user's data
            if user.username != username  or str(user.graduation_year) != str(graduation_year):
                return Response({'detail': 'You are not authorized to access this data.'}, status=status.HTTP_403_FORBIDDEN)

            existing_user = User.objects.filter(email=request.data.get('email')).exclude(id=user_id).first()
            if existing_user:
                return Response({'detail': 'This email is already in use by another user.'}, status=status.HTTP_400_BAD_REQUEST)
            
            mobile_number = request.data.get('mobile')
            if mobile_number and len(mobile_number) > 10:
                return Response({'detail': 'Mobile number should not be greater than 10 digits.'}, status=status.HTTP_400_BAD_REQUEST)

            alumni_profile = AlumniProfile.objects.get(user=user)

            # Partially update user and alumni profile
            user_serializer = EditUserSerializer(user, data=request.data, partial=True)
            alumni_profile_serializer = EditAlumniProfileSerializer(alumni_profile, data=request.data, partial=True)

            if user_serializer.is_valid() and alumni_profile_serializer.is_valid():
                user_serializer.save()
                alumni_profile_serializer.save()
                return Response({
                    'user': user_serializer.data,
                    'alumni_profile': alumni_profile_serializer.data
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'user_errors': user_serializer.errors,
                    'alumni_profile_errors': alumni_profile_serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'detail': 'User not found or is not an alumni'}, status=status.HTTP_404_NOT_FOUND)
        except AlumniProfile.DoesNotExist:
            return Response({'detail': 'Alumni profile not found'}, status=status.HTTP_404_NOT_FOUND)