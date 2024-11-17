from rest_framework import serializers
from .models import User, StudentProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'full_name', 'email', 'mobile', 'linkedin', 'Github',
            'instagram', 'portfolio_link', 'resume_link', 'About',
            'Work', 'Branch', 'skills'
        ]

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = [
            'Education', 'current_year_of_study', 'Heading'
        ]
