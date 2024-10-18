from rest_framework import serializers
from .models import User, HODPrincipalProfile, StudentProfile, AlumniProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'full_name', 'About', 'Work', 'Year_Joined', 'graduation_year', 'Branch', 'email', 'mobile','linkedin', 'Github', 'instagram', 'portfolio_link', 'resume_link', 'skills']


class CustomUserSerializerForHOD(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'full_name', 'About', 'Year_Joined', 'Branch', 'email', 'mobile', 'linkedin', 'Github', 'instagram']

class HODPrincipalProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializerForHOD()  

    class Meta:
        model = HODPrincipalProfile
        fields = '__all__'  

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance


class CustomUserSerializerForStudent(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 
            'full_name', 
            'email', 
            'About', 
            'Work', 
            'Year_Joined', 
            'Branch', 
            'mobile', 
            'linkedin', 
            'Github', 
            'instagram',
            'skills', 
            'graduation_year', 
            'graduation_month', 
            'portfolio_link', 
            'resume_link', 
            
        ]



class StudentProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializerForStudent()

    class Meta:
        model = StudentProfile
        fields = '__all__'  
        
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance

class CustomUserSerializerForAlumni(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 
            'full_name', 
            'email', 
            'About', 
            'Work', 
            'Year_Joined', 
            'Branch', 
            'mobile', 
            'linkedin', 
            'Github', 
            'instagram',
            'skills', 
            'graduation_year', 
            'graduation_month', 
            'portfolio_link', 
            'resume_link', 
        ]
           

class AlumniProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializerForAlumni()

    class Meta:
        model = AlumniProfile
        fields = '__all__'
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance

class UserImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['Image']  

    def validate_image(self, value):
        """Ensure the uploaded image does not exceed the maximum file size."""
        max_size = 2 * 1024 * 1024  # 2 MB in bytes

        if value.size > max_size:
            raise serializers.ValidationError("The image file is too large. Maximum size allowed is 2 MB.")
        
        return value