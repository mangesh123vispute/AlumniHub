from django.shortcuts import  get_object_or_404
from django.shortcuts import get_object_or_404
from .models import User,AlumniPost,HodPrincipalPost,StudentProfile, AlumniProfile, HODPrincipalProfile 
from rest_framework.permissions import IsAuthenticated
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


class HodPrincipalPostAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Require authentication for all actions

    # POST method: Create a new post
    def post(self, request):
        # Check if the user is a superuser
        if not request.user.is_superuser:
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

        # If pk is not provided, return all posts
        posts = HodPrincipalPost.objects.all()  # Fetch all posts
        serializer = HodPrincipalPostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
        return Response(status=status.HTTP_204_NO_CONTENT)


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
    def post(self, request):
        # Check if the user is a superuser
        if not request.user.is_alumni:
            return Response({"detail": "You do not have permission to create a post."}, status=status.HTTP_403_FORBIDDEN)

        serializer = AlumniPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)  # Set the author to the current user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # GET method: Retrieve a single post if pk is given, else list all posts
    def get(self, request, pk=None):
        if pk is not None:
            # Get the specific post by pk
            post = get_object_or_404(AlumniPost, pk=pk)
            serializer = AlumniPostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # If pk is not provided, return all posts
        posts = AlumniPost.objects.all()  # Fetch all posts
        serializer = AlumniPostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
        return Response(status=status.HTTP_204_NO_CONTENT)
    



class GETAlumni(APIView):
    permission_classes = [IsAuthenticated]

    class AlumniPagination(PageNumberPagination):
        page_size = 10  
        page_size_query_param = 'page_size'
        max_page_size = 100

    def get(self, request, *args, **kwargs):
        """
        Handle GET requests for retrieving all alumni or a specific instance by 'id'.
        """
        try:
            alumni_id = kwargs.get('pk', None)
            if alumni_id:
                # If 'pk' is provided in the URL, return specific alumni instance
                alumni_user = User.objects.get(id=alumni_id, is_alumni=True)
                serializer = UserAlumniSerializer(alumni_user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # If no 'pk' is provided, return a paginated list of alumni
                alumni_users = User.objects.filter(is_alumni=True)
                paginator = self.AlumniPagination()
                paginated_alumni = paginator.paginate_queryset(alumni_users, request)
                serializer = UserAlumniSerializer(paginated_alumni, many=True)
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
                hod_user = User.objects.get(id=hod_id, hodprincipalprofile__isnull=False)
                serializer = UserHODSerializer(hod_user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Return a paginated list of all HODs
                hod_users = User.objects.filter(hodprincipalprofile__isnull=False)
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
        Handle GET requests for retrieving all students or a specific instance by 'id'.
        """
        student_id = kwargs.get('pk', None)
        if student_id:
            # If 'pk' is provided in the URL, return specific student instance
            student_user = get_object_or_404(User, id=student_id, is_student=True)
            serializer = UserStudentSerializer(student_user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # If no 'pk' is provided, return a paginated list of students
            student_users = User.objects.filter(is_student=True)
            paginator = self.StudentPagination()
            paginated_students = paginator.paginate_queryset(student_users, request)
            serializer = UserStudentSerializer(paginated_students, many=True)
            return paginator.get_paginated_response(serializer.data)


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

class UserImageUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, user_id, *args, **kwargs):
        user = get_object_or_404(User, id=user_id)

        serializer = UserImageUploadSerializer(user, data=request.data, partial=True) 

        if serializer.is_valid():
            serializer.save() 
            return Response({"detail": "Image updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def get(self, request, user_id, *args, **kwargs):
        user = get_object_or_404(User, id=user_id)
        
        
        if user.Image:
            image_url = request.build_absolute_uri(user.Image.url)
            return Response({"image_url": image_url}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "User has no image."}, status=status.HTTP_404_NOT_FOUND)