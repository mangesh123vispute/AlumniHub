from datetime import date
from django.core.mail import send_mail
from rest_framework import serializers
from .models import AlumniProfile, StudentProfile, User, AlumniPost
from django.conf import settings
import logging
logger = logging.getLogger(__name__)
class ProfileUpdateSerializer(serializers.Serializer):
    graduation_year = serializers.IntegerField()
    graduation_month = serializers.IntegerField()

    def validate(self, data):
        # Validate that the graduation month and year form a valid date
        graduation_year = data.get('graduation_year')
        graduation_month = data.get('graduation_month')
        
        try:
            graduation_date = date(graduation_year, graduation_month, 1)
        except ValueError:
            raise serializers.ValidationError("Invalid graduation year or month.")

        data['graduation_date'] = graduation_date
        return data

    def update_profile(self, user, graduation_date):
        today = date.today()

        if graduation_date >= today:
            # Graduation date is in the future or today; switch to Student
            # Delete AlumniProfile if it exists
            try:
                alumni_profile = AlumniProfile.objects.get(user=user)
                alumni_profile.delete()

                # Delete all related alumni posts using 'author' field
                AlumniPost.objects.filter(author=user).delete()
                logger.info(f"Deleted posts for author: {user}")


            except AlumniProfile.DoesNotExist:
                pass

            # Update user instance
            user.is_student = True
            user.is_alumni = False
            user.save()

            # Send email notification to the user
            send_mail(
                subject="Profile Update: You are now classified as a Student",
                message="Your profile has been updated to Student status.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

            # Create or update StudentProfile (One-to-One)
            StudentProfile.objects.update_or_create(user=user)

        else:
            # Graduation date is in the past; switch to Alumni
            # Delete StudentProfile if it exists
            try:
                student_profile = StudentProfile.objects.get(user=user)
                student_profile.delete()
            except StudentProfile.DoesNotExist:
                pass

            # Ensure an AlumniProfile exists (One-to-One)
            AlumniProfile.objects.get_or_create(user=user)

            # Update user instance
            user.is_student = False
            user.is_alumni = True
            user.save()

        return user

