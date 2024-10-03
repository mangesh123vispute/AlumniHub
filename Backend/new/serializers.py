from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
User=get_user_model()

# class UserLoginSerializer(serializers.Serializer):
#     username = serializers.CharField(max_length=150)
#     password = serializers.CharField(write_only=True)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        # Get the default token
        token = super().get_token(user)

        # Add custom fields from your User model to the token payload
        token['username'] = user.username
        token['email'] = user.email
        token['full_name'] = user.full_name
        token['is_alumni'] = user.is_alumni
        token['is_student'] = user.is_student
        token['is_student'] = user.is_student
        token['is_staff'] = user.is_staff
        token['College'] = user.College
        token['mobile'] = user.mobile
        token['linkedin'] = user.linkedin
        token['Github'] = user.Github
        token['instagram'] = user.instagram
        token['skills'] = user.skills
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        print(token)

        # Add any other fields that you want to include in the token payload
        return token
