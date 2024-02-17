from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image
from django.contrib.auth.models import User

COLLEGE_CHOICES = [
    ('SSBT COET, Jalgaon', 'SSBT COET, Jalgaon'),
    
]



class User(AbstractUser):
    is_alumni = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
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
    admin=models.BooleanField(default=False)

    # modle methods
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.Image.path)
        if img.height > 500 or img.width > 500:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.Image.path)
        if not self.is_alumni and not self.is_student:
            self.admin=True
       


class AlumniPost(models.Model):
    Alumni=models.ForeignKey(User, on_delete=models.CASCADE,default=0)
    tag = models.CharField(max_length=255,default='')
    content = models.TextField(default='')
    title = models.CharField(max_length=255,default='')
    Image = models.ImageField(
        upload_to='images',
        default='default/test.png'
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
        