from rest_framework import serializers
from .models import AlumniPost, HodPrincipalPost, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','full_name', 'Image', 'is_alumni','is_student', 'is_superuser']

class AlumniGETPostSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = AlumniPost
        fields = ['author', 'created_at', 'tag','Image', 'content', 'title', 'image_url', 'DocUrl']

class HodPrincipalGETPostSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = HodPrincipalPost
        fields = ['author', 'created_at', 'tag','Image', 'content', 'title', 'image_url', 'DocUrl']
