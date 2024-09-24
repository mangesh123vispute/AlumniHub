from rest_framework import serializers
from django.contrib.auth import get_user_model

User=get_user_model()

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)

class UserRegistrationSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = User
        fields = ['username', 'email', 'password']