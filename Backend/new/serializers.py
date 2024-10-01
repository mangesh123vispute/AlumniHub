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
        token['is_alumni'] = user.is_alumni
        token['is_student'] = user.is_student
        token['College'] = user.College
        token['mobile'] = user.mobile
        token['linkedin'] = user.linkedin
        token['Github'] = user.Github
        token['instagram'] = user.instagram
        token['skills'] = user.skills
        token['followers'] = user.followers
        token['following'] = user.following
        print(token)

        # Add any other fields that you want to include in the token payload
        return token
