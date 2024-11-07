import urllib.parse
from datetime import datetime,timedelta
from django.conf import settings
from django.core.mail import send_mail,EmailMultiAlternatives
from django.urls import reverse
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_activation_email(user, uidb64, token, data={}):
    subject = "Activate Your Account"
    message = f"Hello {user.username},\n\nThank you for registering! To activate your account, please click the button below and follow the link provided."
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [user.email]
    
    # Serialize all validated data into URL query parameters
    encoded_data = urllib.parse.urlencode(data)

    # Create activation link with serialized data
    activation_link = f"{settings.SITE_URL}{reverse('activate_account', kwargs={'uidb64': uidb64, 'token': token})}?{encoded_data}"
    
    context: dict[str, str] = {
        'message': message,
        'url': activation_link,
        'message3': "Activate Your Account"
    }
    html_message = render_to_string('account/BaseEmail.html', context)
    plain_message = strip_tags(html_message)
      
    
    message = EmailMultiAlternatives(
        subject=subject,
        body=plain_message,
        from_email=email_from,
        to=recipient_list
    )
    message.attach_alternative(html_message, "text/html")
    message.send()