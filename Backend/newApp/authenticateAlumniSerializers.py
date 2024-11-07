# serializers.py
from rest_framework import serializers
from .models import User



class InactiveAlumniSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = User
        fields = ["id",'full_name',"linkedin"]
