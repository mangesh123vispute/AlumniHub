from rest_framework import serializers
from .models import User, StudentProfile,AlumniProfile

class EditUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'full_name', 'email', 'mobile', 'linkedin', 'Github',
            'instagram', 'portfolio_link', 'resume_link', 'About',
            'Work', 'Branch', 'skills','Year_Joined'
        ]

class EditStudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = [
            'Education', 'current_year_of_study', 'Heading'
        ]

class EditAlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = [
            'Heading', 'Education', 'current_company_name', 'job_title',
            'previous_companies', 'years_of_experience', 'industry',
            'achievements', 'current_city', 'current_country', 'preferred_contact_method'
        ]