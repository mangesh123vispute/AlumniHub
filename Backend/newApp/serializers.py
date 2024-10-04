from rest_framework import serializers
from .models import HodPrincipalPost 


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
