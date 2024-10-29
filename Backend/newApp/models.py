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
from django.utils import timezone
from django.core.exceptions import ValidationError



class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True,blank=True)
    full_name = models.CharField(max_length=255,blank=True, default="N/A")
    email = models.EmailField(blank=True, default="N/A")

    is_alumni = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    
#    Other info
    About = models.TextField(max_length=1000,blank=True, default="N/A")        
    Work = models.TextField(max_length=1000,blank=True, default="N/A")
    Year_Joined = models.IntegerField(blank=True, default=0, validators=[MinValueValidator(1983), MaxValueValidator(2100)] )
    Branch = models.CharField(max_length=50,blank=True, default="N/A")
    Image = models.ImageField(
        upload_to='images', 
        default='default/def.jpeg',
        blank=True
    )
    # contact infromation
    mobile = models.CharField(max_length=10,blank=True, default="N/A")
    linkedin = models.CharField(max_length=500,blank=True, default="N/A")
    Github = models.CharField(max_length=500,blank=True, default="N/A")
    instagram = models.CharField(max_length=500, blank=True,default="N/A")
    portfolio_link=models.CharField(max_length=500,blank=True,default="N/A")
    resume_link=models.CharField(max_length=500,blank=True,default="N/A")
    skills = models.TextField(blank=True,default="N/A") 

    graduation_month = models.IntegerField(
        blank=True,  # Allow blank for superuser in the validation
        null=True,   # Allow null for superuser in the validation
        default=0, 
        
    )
    graduation_year = models.IntegerField(
        blank=True,  # Allow blank for superuser in the validation
        null=True,   # Allow null for superuser in the validation
        default=0, 
        
    )
    is_active = models.BooleanField(default=False)

    
    def generate_unique_username(self):
        """Generates a unique username using a UUID."""
        unique_username = str(uuid.uuid4())[:8]  
        while User.objects.filter(username=unique_username).exists():
            unique_username = str(uuid.uuid4())[:8]
        return unique_username
        
    
    def send_activation_email(self):
        """Sends an email to activate the user account."""
        subject = "Activate Your Account"
        message = "Please activate your account by clicking the link below."
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [self.email]

        full_url = "http://localhost:3000/activate_email"
        
        html_message = f"""
            <p>{message}</p>
            <p><a href="{full_url}">Activate Your Account</a></p>
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
        
        if self.email and User.objects.filter(email=self.email).exclude(pk=self.pk).exists():
            raise ValidationError(f"A user with email '{self.email}' already exists.")

        if self.is_superuser:
            self.is_active = True
            

        if not self.username:
            self.username = self.generate_unique_username()

        send_activation = not self.is_active and not self.pk
        
        img = Image.open(self.Image.path)
        if img.height > 500 or img.width > 500:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.Image.path)


        if send_activation:
            self.send_activation_email()

        super().save(*args, **kwargs)

        
    def clean(self):
        # Call the parent clean method
        super().clean()

        # Apply validation only if the user is not a superuser
        if not self.is_superuser:
            # Check for missing graduation year and month
            if self.graduation_year is None:
                raise ValidationError("Graduation year is required for non-superusers.")
            if self.graduation_month is None:
                raise ValidationError("Graduation month is required for non-superusers.")

            # Validate graduation year between 1983 and 2100
            if not (1983 <= self.graduation_year <= 2100):
                raise ValidationError("Graduation year must be between 1983 and 2100.")

            # Validate graduation month between 1 and 12
            if not (1 <= self.graduation_month <= 12):
                raise ValidationError("Graduation month must be between 1 and 12.")       

class AlumniProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Heading= models.CharField(max_length=255,blank=True,default="N/A")
    current_company_name = models.CharField(max_length=255,blank=True,default="N/A")
    job_title = models.CharField(max_length=255,blank=True,default="N/A")
    Education = models.CharField(max_length=255, blank=True,default="N/A")
    current_city = models.CharField(max_length=100,blank=True, default="N/A")
    current_country = models.CharField(max_length=100, blank=True,default="N/A")
    years_of_experience = models.IntegerField(blank=True, default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    industry = models.CharField(max_length=100,blank=True, default="N/A")
    achievements = models.TextField(blank=True,default="N/A")
    previous_companies = models.TextField(blank=True,default="N/A")
    preferred_contact_method = models.CharField(max_length=50, choices=[('email', 'Email'), ('mobile', 'Mobile'), ('linkedin', 'LinkedIn'),('instagram', 'Instagram')], blank=True,default='email')


    def __str__(self):
        return f"{self.user.full_name} - {self.current_company_name}"

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Heading= models.CharField(max_length=255, blank=True,default="N/A")
    Education = models.CharField(max_length=255,blank=True,default="N/A")
    current_year_of_study = models.IntegerField(blank=True,default=0, validators=[MinValueValidator(0), MaxValueValidator(10)])

    def __str__(self):
        return f"{self.user.full_name} - Student"


class HODPrincipalProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    designation = models.CharField(max_length=100,blank=True,default="N/A")  
    def __str__(self):
        return f"{self.user.full_name} - {self.designation}"

class AlumniPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    tag = models.CharField(max_length=255,blank=True, default="N/A")
    title = models.CharField(max_length=255, blank=True,default="N/A")
    content = models.TextField(blank=True,default="N/A")
    Image = models.ImageField(
        upload_to='images',
        default='default/def.jpeg',
        blank=True
    )
    image_url = models.URLField(max_length=500,blank=True, default="N/A")  
    DocUrl = models.URLField(max_length=500,blank=True, default="N/A")  
    created_at = models.DateTimeField(default=timezone.now, blank=True)  
    updated_at = models.DateTimeField(auto_now=True, blank=True)  
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.Image.path)
        if img.height > 1200 or img.width > 1200:
            output_size = (1000, 1000)
            img.thumbnail(output_size)
            img.save(self.Image.path)

    def __str__(self):
        return f"{self.title} by {self.author.full_name}"


class HodPrincipalPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255,blank=True, default="N/A")
    content = models.TextField(blank=True,default="N/A")
    tag = models.CharField(max_length=255,blank=True, default="N/A")
    Image = models.ImageField(
        upload_to='images',
        default='default/def.jpeg',
        blank=True
    )
    image_url = models.URLField(max_length=500,blank=True,default="N/A")  
    DocUrl = models.URLField(max_length=500, blank=True,default="N/A")  
    created_at = models.DateTimeField(default=timezone.now, blank=True)  
    updated_at = models.DateTimeField(auto_now=True, blank=True) 

    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.Image.path)
        if img.height > 1200 or img.width > 1200:
            output_size = (1000, 1000)
            img.thumbnail(output_size)
            img.thumbnail(output_size)
            img.save(self.Image.path)
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



