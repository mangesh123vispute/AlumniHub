from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework import status
User=get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_email(self, value):
        """
        Check if the email already exists and if the account is inactive.
        """
        try:
            user = User.objects.get(email=value)
            if not user.is_active:
                raise serializers.ValidationError(
                    "This email is already registered, but the account is not activated. "
                    "Please activate your account."
                )
            else:
                raise serializers.ValidationError(
                    "This email is already registered. Please log in."
                )
        except User.DoesNotExist:
            pass  

        return value

  
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        
        token = super().get_token(user)
        if not user.is_active:
            raise AuthenticationFailed(
                detail='User is not active, please activate your account.', 
                code=status.HTTP_403_FORBIDDEN
            )
        # Add custom fields from your User model to the token payload
        token['username'] = user.username
        token['email'] = user.email
        token['full_name'] = user.full_name
        token['is_alumni'] = user.is_alumni
        token['is_student'] = user.is_student
        token['is_superuser'] = user.is_superuser
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

class ActivationEmailSerializer(serializers.Serializer):
    username=serializers.CharField()
    email = serializers.EmailField()
    password=serializers.CharField()
    role=serializers.CharField()


