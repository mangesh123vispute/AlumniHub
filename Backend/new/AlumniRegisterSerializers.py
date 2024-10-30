from rest_framework import serializers
from newApp.models import User, AlumniCredentials


class AlumniRegistrationSerializer(serializers.ModelSerializer):
    document_type = serializers.ChoiceField(choices=[
        ('fourth_year_marksheet', 'Fourth Year Marksheet'),
        ('lc', 'Leaving Certificate'),
        ('id_card', 'ID Card'),
        ('graduation_certificate', 'Graduation Certificate')
    ])
    document_file = serializers.ImageField()

    class Meta:
        model = User
        fields = ['username', 'email', 'graduation_month', 'graduation_year', 'linkedin', 'password', 'document_type', 'document_file']

    def create(self, validated_data):
        # Extract document type and file
        document_type = validated_data.pop('document_type')
        document_file = validated_data.pop('document_file')

        # Create user with is_alumni=True and is_active=False
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            graduation_month=validated_data['graduation_month'],
            graduation_year=validated_data['graduation_year'],
            linkedin=validated_data.get('linkedin'),
            is_alumni=True,
            is_active=False
        )
        user.set_password(validated_data['password'])
        user.save()

        # Save document in AlumniCredentials
        alumni_credentials = AlumniCredentials(user=user)
        setattr(alumni_credentials, document_type, document_file)
        alumni_credentials.save()

        return user
