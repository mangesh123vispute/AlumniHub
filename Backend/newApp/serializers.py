from rest_framework import serializers
from .models import HodPrincipalPost ,AlumniProfile,AlumniPost,HODPrincipalProfile
from django.contrib.auth import get_user_model

User = get_user_model()


class HodPrincipalPostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_username = serializers.SerializerMethodField()

    class Meta:
        model = HodPrincipalPost
        fields = [
            'id',
            'author_name',  
            'author_username',  
            'title',
            'content',
            'tag',
            'image_url',
            'DocUrl',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_author_name(self, obj):
        return obj.author.full_name  

    def get_author_username(self, obj):
        return obj.author.username  

class AlumniPostSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_username = serializers.SerializerMethodField()

    class Meta:
        model = AlumniPost
        fields = [
            'id',
            'author_name',  
            'author_username',  
            'tag',
            'title',
            'content',
            'Image',
            'image_url',
            'DocUrl',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']

    # Custom method to get author's full name
    def get_author_name(self, obj):
        return obj.author.full_name

    # Custom method to get author's username
    def get_author_username(self, obj):
        return obj.author.username
    
    
class AlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = '__all__'


# User Serializer with nested AlumniProfile
class UserAlumniSerializer(serializers.ModelSerializer):
    alumni_profile = AlumniProfileSerializer(source='alumniprofile', read_only=True)
    

    class Meta:
        model = User
        fields = [
            'id', 'username', 'full_name', 'email',
            'College', 'is_alumni', 'is_student', 'About', 'Work', 'Year_Joined', 
            'Branch',  'mobile', 'linkedin', 'Github', 'instagram', 
            'alumni_profile'  
        ]


# Serializer for HODPrincipalProfile
class HODPrincipalProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = HODPrincipalProfile
        fields = '__all__'

# User serializer with nested HODPrincipalProfile
class UserHODSerializer(serializers.ModelSerializer):
    hod_profile = HODPrincipalProfileSerializer(source='hodprincipalprofile', read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'full_name', 'email',
            'College',  'About', 'Work', 'Year_Joined', 
            'Branch', 'mobile', 'linkedin', 'Github', 'instagram', 
            'hod_profile'  # Nested HODPrincipalProfile data
        ]