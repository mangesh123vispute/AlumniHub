from rest_framework import serializers
from newApp.models import User

class AdminRegistrationSerializer(serializers.ModelSerializer):
    Branch = serializers.CharField(required=False)
    designation = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'full_name', 'Branch', 'designation', 'password','is_allowedToJoinAlumni']
        extra_kwargs = {
            'password': {'write_only': True}
        }
