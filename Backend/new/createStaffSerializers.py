from rest_framework import serializers
from newApp.models import User, HODPrincipalProfile

class StaffUserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    designation = serializers.CharField(required=True)  # Assuming designation is a simple CharField
    Branch=serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ['full_name', 'email', 'designation', 'Branch']

    def create(self, validated_data):
        full_name = validated_data.get('full_name')
        email = validated_data.get('email')
        designation = validated_data.get('designation')
        Branch=validated_data.get('Branch')

        # Create the user instance
        user = User.objects.create(
            full_name=full_name,
            email=email,
            Branch=Branch,
            is_staff=True,  # Set user as staff
        )
        
        # Save designation in the related profile model
        HODPrincipalProfile.objects.create(user=user, designation=designation)

        return user
