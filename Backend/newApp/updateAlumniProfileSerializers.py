from datetime import date
from django.core.mail import send_mail,EmailMultiAlternatives
from rest_framework import serializers
from .models import AlumniProfile, StudentProfile, User, AlumniPost
from django.conf import settings
import logging
from django.template.loader import render_to_string
from django.utils.html import strip_tags


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

            # # Send email notification to the user
            # send_mail(
            #     subject="Profile Update: You are now classified as a Student",
            #     message="Your profile has been updated to Student status.",
            #     from_email=settings.DEFAULT_FROM_EMAIL,
            #     recipient_list=[user.email],
            #     fail_silently=False,
            # )
            # Send email notification to the user
            subject = "Profile Update: You are now classified as a Student"
            email_from = settings.DEFAULT_FROM_EMAIL
            recipient_list = [user.email]

            # Prepare context for rendering the email template
            context: dict[str, str] = {
                'user': user.full_name,
                'message': "Your profile has been updated to Student status. You can now access student-specific features in AlumniHub.",
                'message3': "Explore Student Features",
                "url":"http://localhost:3000/login",
            }

            # Render the email content using a template
            html_message = render_to_string('account/BaseEmail.html', context)
            plain_message = strip_tags(html_message)

            # Send email using EmailMultiAlternatives
            message = EmailMultiAlternatives(
                subject=subject,
                body=plain_message,
                from_email=email_from,
                to=recipient_list
            )
            message.attach_alternative(html_message, "text/html")
            message.send()


            

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

