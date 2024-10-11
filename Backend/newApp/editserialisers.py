from rest_framework import serializers
from .models import User, HODPrincipalProfile, StudentProfile, AlumniProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'full_name', 'About', 'Work', 'Year_Joined', 'graduation_year', 'Branch', 'email', 'mobile','linkedin', 'Github', 'instagram', 'portfolio_link', 'resume_link', 'skills']

class HODPrincipalProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()  

    class Meta:
        model = HODPrincipalProfile
        fields = '__all__'  

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance

class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = StudentProfile
        fields = '__all__'  
        
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance


class AlumniProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = AlumniProfile
        fields = '__all__'
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance

