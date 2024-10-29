from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, AlumniProfile, StudentProfile, HODPrincipalProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    # Do not create a profile if the user is a staff member
    if created and not instance.is_staff:
        print("Creating user profile", instance.is_student, instance.is_alumni)
        
        if instance.is_student:
            if not hasattr(instance, 'studentprofile'):
                print("Creating student profile")
                StudentProfile.objects.create(user=instance)
            else:
                print("Student profile already exists")
                
        elif instance.is_alumni:
            if not hasattr(instance, 'alumniprofile'):
                print("Creating alumni profile")
                AlumniProfile.objects.create(user=instance)
            else:
                print("Alumni profile already exists")
                
        else:
            if not hasattr(instance, 'hodprincipalprofile'):
                print("Creating HOD profile")
                HODPrincipalProfile.objects.create(user=instance)
            else:
                print("HOD profile already exists")

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    # Do not save profile if the user is a staff member
    if not instance.is_staff:
        # Ensure the profile is saved whenever the user is saved
        if hasattr(instance, 'studentprofile'):
            instance.studentprofile.save()
        elif hasattr(instance, 'alumniprofile'):
            instance.alumniprofile.save()
        elif hasattr(instance, 'hodprincipalprofile'):
            instance.hodprincipalprofile.save()
