from rest_framework import serializers
from .models import HodPrincipalPost ,AlumniProfile
from django.contrib.auth import get_user_model

User = get_user_model()

class HodPrincipalPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = HodPrincipalPost
        fields = [
            'id',  
            'author',
            'title',
            'content',
            'tag',
            'image_url',
            'DocUrl',
            'likes',
            'dislikes',
            'created_at',
            'updated_at',
            'is_visible_to_students',
            'is_visible_to_alumni',
            'is_visible_to_public'
        ]
        read_only_fields = ['created_at', 'updated_at']  


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