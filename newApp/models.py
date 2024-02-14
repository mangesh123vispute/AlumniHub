from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image
from django.contrib.auth.models import User

COLLEGE_CHOICES = (
    ('Indian Institute Of Technology, Jodhpur',
     'Indian Institute Of Technology, Jodhpur'),
    ('Indian Institute Of Technology, Indore',
     'Indian Institute Of Technology, Indore'),
    ('Indian Institute Of Technology, Mumbai',
     'Indian Institute Of Technology, Mumbai'),
    ('Indian Institute Of Technology, Palakkad',
     'Indian Institute Of Technology, Palakkad'),
    ('Indian Institute Of Technology, Dhanbad',
     'Indian Institute Of Technology, Dhanbad'),
    ('Indian Institute Of Technology, Delhi',
     'Indian Institute Of Technology, Delhi'),
    ('Indian Institute Of Technology, Kanpur',
     'Indian Institute Of Technology, Kanpur'),
    ('Indian Institute Of Technology, Kharagpur',
     'Indian Institute Of Technology, Kharagpur'),
)


class User(AbstractUser):
    is_alumni = models.BooleanField(default=False)
    is_college = models.BooleanField(default=False)
    College = models.CharField(
        max_length=80,
        choices=COLLEGE_CHOICES, 
        default="None"
    )
    About = models.TextField(max_length=800)
    Work = models.TextField(max_length=50)
    Year_Joined = models.CharField(max_length=4)
    Branch = models.CharField(max_length=50)
    Image = models.ImageField(
        upload_to='images',
        default='default/test.png'
    )
    Verified = models.BooleanField(default=False)

    # modle methods
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.Image.path)
        if img.height > 500 or img.width > 500:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.Image.path)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=0)
    content = models.TextField(default='')
    comments = models.JSONField(default=list)   
    likes = models.PositiveIntegerField(default=0)
    is_alumni_post = models.BooleanField(default=False)
    is_college_post = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
       
        if self.user.is_alumni:
            self.is_alumni_post = True
        elif self.user.is_college:
            self.is_college_post = True

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Post by {self.user.username}"