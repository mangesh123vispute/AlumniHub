from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, AlumniProfile, StudentProfile, HODPrincipalProfile


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        print("creating user profile", instance.is_student, instance.is_alumni)

        if instance.is_student:
            StudentProfile.objects.create(user=instance)
        elif instance.is_alumni :
            AlumniProfile.objects.create(user=instance)
        else:
            HODPrincipalProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    # Ensure the profile is saved whenever the user is saved.
    if hasattr(instance, 'studentprofile'):
        instance.studentprofile.save()
    elif hasattr(instance, 'alumniprofile'):
        instance.alumniprofile.save()
    elif hasattr(instance, 'hodprincipalprofile'):
        instance.hodprincipalprofile.save()
