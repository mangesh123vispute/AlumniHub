from django.core.management.base import BaseCommand
from django.contrib.auth.management.commands import createsuperuser
from . models import User  # Import your User model

class Command(createsuperuser.Command):
    help = 'Create a superuser with admin=True'

    def handle(self, *args, **options):
        # Call the original createsuperuser command
        super().handle(*args, **options)

        # Find the newly created superuser and set admin=True
        username = options.get('username', None)
        if username:
            try:
                user = User.objects.get(username=username)
                user.admin = True
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Successfully set admin=True for user "{username}"'))
            except User.DoesNotExist:
                self.stderr.write(self.style.ERROR(f'User "{username}" not found'))

