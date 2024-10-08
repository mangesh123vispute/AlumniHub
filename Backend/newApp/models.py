from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager,AbstractBaseUser
from PIL import Image
from django.contrib.auth.models import User
from django.contrib.auth.management.commands import createsuperuser
from django.core.management import CommandError
from django.utils.text import capfirst
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.postgres.fields import ArrayField
import json
import uuid
from django.conf import settings
from django.urls import reverse
from django.core.mail import send_mail
from django.utils import timezone
from django.core.exceptions import ValidationError

COLLEGE_CHOICES = [
    ('SSBT COET, Jalgaon', 'SSBT COET, Jalgaon'),
     
]   
USER_TYPE_CHOICES = (
        ('student', 'Student'),
        ('alumni', 'Alumni'),
        ('hod', 'HOD'),
    )
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, blank=True, default="")
    full_name = models.CharField(max_length=255,blank=True, default="")
    first_name = models.CharField(max_length=30, blank=True, default='')  
    last_name = models.CharField(max_length=150, blank=True, default='')
    email = models.EmailField( blank=True, default='')
    College = models.CharField(
        max_length=80,
        choices=COLLEGE_CHOICES, 
        default="SSBT COET",
        blank=True
    )

    is_alumni = models.BooleanField(default=False, blank=True)
    is_student = models.BooleanField(default=False, blank=True)
    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPE_CHOICES,
        default='student',
        blank=True
    )


#    Other info
    About = models.TextField(max_length=800, blank=True, default='')        
    Work = models.TextField(max_length=800, blank=True, default='')
    Year_Joined = models.CharField(max_length=4, blank=True, default='')
    Branch = models.CharField(max_length=50, blank=True, default='')
    Image = models.ImageField(
        upload_to='images', 
        default='default/def.jpeg',
        blank=True
    )

    # contact infromation
    mobile = models.CharField(max_length=10, default='', blank=True)
    linkedin = models.CharField(max_length=100, default='', blank=True)
    Github = models.CharField(max_length=100, default='', blank=True)
    instagram = models.CharField(max_length=100, default='', blank=True)
    skills = models.TextField(default='', blank=True) 
    
    # followings and followers 
    followers = models.TextField(default='[]', blank=True)  
    following = models.TextField(default='[]', blank=True)

    is_active = models.BooleanField(default=False)

    def string_to_list(self, string):
        """Converts a string representing a list to a Python list."""
        items = string.strip('[]').split(',')
        items = [item.strip() for item in items if item.strip()]
        return items
    
    def list_to_string(self, lst):
        """Converts a Python list to a string representing a list."""
        str_items = map(str, lst)
        joined_str = ', '.join(str_items)
        return '[' + joined_str + ']'

    def set_followers(self, followers_list):
        stringfollowers_list = self.list_to_string(followers_list)
        self.followers = stringfollowers_list

    def get_followers(self):
        return self.string_to_list(self.followers)

    def set_following(self, following_list):
        stringfollowing_list = self.list_to_string(following_list)
        self.following = stringfollowing_list
        
    def get_following(self):
        return self.string_to_list(self.following)

    def generate_unique_username(self):
        """Generates a unique username using a UUID."""
        unique_username = str(uuid.uuid4())[:8]  # Generate an 8-character unique identifier
        while User.objects.filter(username=unique_username).exists():
            unique_username = str(uuid.uuid4())[:8]
        return unique_username
        
    def send_role_query_email(self):
        """Sends an email to the user asking for their role."""
        subject = "Please Confirm Your Role"
        message = "Are you an alumni, student, or college faculty? Please select your role."
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [self.email]

        role_selection_url = reverse('role_selection', args=[self.id])
        full_url = f"{settings.SITE_URL}{role_selection_url}"

        html_message = f"""
            <p>{message}</p>
            <p><a href="{full_url}">Click here to select your role</a></p>
        """

        send_mail(
            subject,
            message,
            email_from,
            recipient_list,
            html_message=html_message,
            fail_silently=False,
        )

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.generate_unique_username()
        super().save(*args, **kwargs)
        img = Image.open(self.Image.path)
        if img.height > 500 or img.width > 500:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.Image.path)
        
        if (self.email) and (not self.is_alumni and not self.is_student and not self.is_superuser ):
            self.send_role_query_email()
            

class AlumniProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    current_company_name = models.CharField(max_length=255, blank=True,default='')
    job_title = models.CharField(max_length=255, blank=True,default='')
    graduation_year = models.IntegerField(blank=True, null=True, default=0)
    Education = models.CharField(max_length=255, blank=True,default='')
    current_city = models.CharField(max_length=100, blank=True,default='')
    current_country = models.CharField(max_length=100, blank=True,default='')
    years_of_experience = models.IntegerField(blank=True, null=True,default=0)
    industry = models.CharField(max_length=100, blank=True,default='')
    profile_picture_url = models.URLField(max_length=500, blank=True, null=True)
    achievements = models.TextField(blank=True)
    previous_companies = models.TextField(blank=True)
    preferred_contact_method = models.CharField(max_length=50, choices=[('email', 'Email'), ('phone', 'Phone'), ('linkedin', 'LinkedIn')], default='email')


    def __str__(self):
        return f"{self.user.full_name} - {self.current_company_name}"

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    graduation_year = models.IntegerField(blank=True, null=True)
    current_year_of_study = models.CharField(max_length=50, blank=True, null=True)  
    department = models.CharField(max_length=100, blank=True, null=True) 
    def __str__(self):
        return f"{self.user.full_name} - Student"


class HODPrincipalProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=100, blank=True, null=True)  
    designation = models.CharField(max_length=100, blank=True, null=True)  
   
    def __str__(self):
        return f"{self.user.full_name} - {self.designation}"

class AlumniPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    tag = models.CharField(max_length=255, default='')
    title = models.CharField(max_length=255, default='')
    content = models.TextField(default='')
    Image = models.ImageField(
        upload_to='images',
        default='default/def.jpeg',
        blank=True
    )
    image_url = models.URLField(max_length=500, blank=True, null=True)  
    DocUrl = models.URLField(max_length=500, blank=True, null=True)  
    created_at = models.DateTimeField(default=timezone.now, blank=True)  
    updated_at = models.DateTimeField(auto_now=True, blank=True)  
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.Image.path)
        if img.height > 500 or img.width > 500:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.Image.path)

    def __str__(self):
        return f"{self.title} by {self.author.full_name}"


class HodPrincipalPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    title = models.CharField(max_length=255, default='')
    content = models.TextField(default='')
    tag = models.CharField(max_length=255, default='')
    image_url = models.URLField(max_length=500, blank=True, null=True)  
    DocUrl = models.URLField(max_length=500, blank=True, null=True)  
    created_at = models.DateTimeField(default=timezone.now, blank=True)  
    updated_at = models.DateTimeField(auto_now=True, blank=True) 
    
    def __str__(self):
        return f"{self.title} by {self.author.full_name}"

class Command(createsuperuser.Command):
    help = 'Custom createsuperuser command'

    def handle(self, *args, **options):
       
        self.stdout.write(self.style.SUCCESS('Custom logic before createsuperuser'))

        
        super().handle(*args, **options)


        self.stdout.write(self.style.SUCCESS('Custom logic after createsuperuser'))

        username = options.get('username', None)
        if username:
            try:
                user = self.UserModel._default_manager.get_by_natural_key(username)
                user.admin = True
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Set admin=True for user {username}'))
            except self.UserModel.DoesNotExist:
                raise CommandError("The user doesn't exist.")



# class AlumniExperience(models.Model):
#     alumni_profile = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE, related_name="experiences")
#     company_name = models.CharField(max_length=255)
#     job_title = models.CharField(max_length=255)
#     start_date = models.DateField()
#     end_date = models.DateField(blank=True, null=True)  
#     description = models.TextField(blank=True)
#     CurrentlyWorking = models.BooleanField(default=False)
#     responsibilities = models.TextField(blank=True)  
#     location_city = models.CharField(max_length=100, blank=True)
#     location_country = models.CharField(max_length=100, blank=True)

#     def __str__(self):
#         return f"{self.job_title} at {self.company_name} ({self.start_date} - {self.end_date or 'Present'})"

# class Event(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     event_date = models.DateTimeField()
#     location = models.CharField(max_length=255)
#     created_by = models.ForeignKey(HODPrincipalProfile, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.title

# class Feedback(models.Model):
#     alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE)
#     feedback_text = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Feedback by {self.alumni.user.full_name}"

# class Donation(models.Model):
#     alumni = models.ForeignKey(AlumniProfile, on_delete=models.CASCADE)
#     amount = models.DecimalField(max_digits=10, decimal_places=2)
#     date_donated = models.DateTimeField(auto_now_add=True)
#     purpose = models.CharField(max_length=255, blank=True)

#     def __str__(self):
#         return f"{self.alumni.user.full_name} - {self.amount}"


# class AlumniPost(models.Model):
#     author=models.ForeignKey(User, on_delete=models.CASCADE,default=0)
#     tag = models.CharField(max_length=255,default='')
#     content = models.TextField(default='')
#     title = models.CharField(max_length=255,default='')
#     Image = models.ImageField(
#         upload_to='images',
#         default='default/def.jpeg',
#         blank=True
#     )
#     likes = models.IntegerField(default=0, blank=True)
  
#     def __str__(self):
#         return self.title

#     def save(self, *args, **kwargs):
#         super().save(*args, **kwargs)
#         img = Image.open(self.Image.path)
#         if img.height > 500 or img.width > 500:
#             output_size = (300, 300)
#             img.thumbnail(output_size)
#             img.save(self.Image.path)


