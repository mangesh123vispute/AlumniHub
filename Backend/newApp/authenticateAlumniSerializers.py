# serializers.py
from rest_framework import serializers
from .models import User, AlumniCredentials

class AlumniCredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniCredentials
        fields = ['fourth_year_marksheet', 'lc', 'id_card', 'graduation_certificate']

class InactiveAlumniSerializer(serializers.ModelSerializer):
    alumni_credentials = AlumniCredentialsSerializer()

    class Meta:
        model = User
        fields = ["id",'full_name',"linkedin", 'alumni_credentials']
