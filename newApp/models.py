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
COLLEGE_CHOICES = [
    ('SSBT COET, Jalgaon', 'SSBT COET, Jalgaon'),
     
]   

class User(AbstractUser):
    is_alumni = models.BooleanField(default=False,  blank=True)
    is_student = models.BooleanField(default=False, blank=True)
    admin=models.BooleanField(default=False,  blank=True)
    email = models.EmailField(unique=True) 
    College = models.CharField( 
        max_length=80,
        choices=COLLEGE_CHOICES, 
        default="None"
    )
    About = models.TextField(max_length=800)        
    Work = models.TextField(max_length=50)
    Year_Joined = models.CharField(max_length=4,  blank=True)
    Branch = models.CharField(max_length=50)
    Image = models.ImageField(
        upload_to='images',
        default='default/def.jpeg',
    )
    mobile=models.CharField(max_length=10,default='',blank=True)
    linkedin=models.CharField(max_length=100,default='')
    instagram=models.CharField(max_length=100,default='',blank=True)
    skills=models.TextField(default='')
    first_name = models.CharField(max_length=30)  
    last_name = models.CharField(max_length=150)
    followers = models.TextField(default='{"Ids": "[]"}')  
    following = models.TextField(default='{"Ids": "[]"}')

    def set_followers(self, followers_list):
        print("This are the followers list",json.dumps(followers_list))
        self.followers = json.dumps(followers_list)
        # print("This are the followers",self.followers)

    def get_followers(self):
        return json.loads(self.followers)

    def set_following(self, following_list):
        self.following = json.dumps(following_list)
        

    def get_following(self):
        return json.loads(self.following)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.Image.path)
        if img.height > 500 or img.width > 500:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.Image.path)
        if not self.is_alumni and not self.is_student:
            self.admin=True



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




class AlumniPost(models.Model):
    Alumni=models.ForeignKey(User, on_delete=models.CASCADE,default=0)
    tag = models.CharField(max_length=255,default='')
    content = models.TextField(default='')
    title = models.CharField(max_length=255,default='')
    Image = models.ImageField(
        upload_to='images',
        default='default/def.jpeg'
    )
    likes = models.IntegerField(default=0)
  
    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.Image.path)
        if img.height > 500 or img.width > 500:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.Image.path)
        