import urllib.parse
from datetime import datetime,timedelta
from django.conf import settings
from django.core.mail import send_mail
from django.urls import reverse


def send_activation_email(user, uidb64, token, data):
    subject = "Activate Your Account"
    message = "Please activate your account using the link below:"
    
    # Serialize all validated data into URL query parameters
    encoded_data = urllib.parse.urlencode(data)

    # Create activation link with serialized data
    activation_link = f"{settings.SITE_URL}{reverse('activate_account', kwargs={'uidb64': uidb64, 'token': token})}?{encoded_data}"

    html_message = f"""
        <p>{message}</p>
        <p><a href="{activation_link}">Activate your account</a></p>
    """
    
    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
        html_message=html_message
    )