from import_export import resources, fields
from import_export.widgets import BooleanWidget
from .models import User
from django.core.mail import send_mail




class UserResource(resources.ModelResource):
    # Use BooleanWidget to correctly interpret TRUE/FALSE values
    is_alumni = fields.Field(attribute='is_alumni', column_name='is_alumni', widget=BooleanWidget())
    is_student = fields.Field(attribute='is_student', column_name='is_student', widget=BooleanWidget())

    class Meta:
        model = User
        # Specify the fields that you want to include in the import
        fields = (
            'is_alumni', 'is_student', 'email', 'About', 
            'Work', 'Branch', 'mobile', 
            'linkedin', 'Github', 'instagram', 'skills', 
            'first_name', 'last_name'
        )
        
    def import_field(self, field, obj, data, is_m2m=False, **kwargs):
        """
        Overriding import_field to ensure only fields that exist in the model
        are considered. Fields not defined in the model will be ignored.
        If a field is missing in the Excel data, it is set to a blank value.
        """
        print("i am running")
        if field.column_name in data:
            # If the field is in the data, import its value
            super().import_field(field, obj, data, is_m2m, **kwargs)
        else:
            # If the field is missing in the data, set it to a blank value
            setattr(obj, field.attribute, '')
    
    def after_import(self, dataset, **kwargs):
        # Get the imported users
        print("Running after_import")
        user_emails = [row['email'] for row in dataset.dict if row.get('email')]
        # Send activation emails
        self.send_activation_emails(user_emails)

    def send_activation_emails(self, user_emails):
        for email in user_emails:
            user = User.objects.filter(email=email).first()
            if user and not user.is_active:
                activation_link = "http://localhost:3000/activate_email"
                email_subject = "Activate Your AlumniHub Account"
                email_content = (
                    f"Dear {user.full_name},\n\n"
                    "Your account is currently inactive. To activate your account, please click the link below:\n\n"
                    f"Click here: {activation_link}\n\n"
                    "Best regards,\n"
                    "The AlumniHub Team"
                )
                send_mail(
                    email_subject,
                    email_content,
                    'mangesh2003vispute@gmail.com',  # Sender email
                    [user.email],  # Recipient email
                    fail_silently=False,
                )