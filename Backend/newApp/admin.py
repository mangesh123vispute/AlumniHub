import tkinter as tk
from django.contrib import admin
from django.core.mail import send_mail,EmailMultiAlternatives
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from django.utils import timezone
from .models import User, AlumniPost, AlumniProfile, StudentProfile,HODPrincipalProfile,HodPrincipalPost
from .resources import UserResource
from django.contrib.auth.models import Permission
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

admin.site.site_header = "AlumniHub Settings"
admin.site.site_title = "AlumniHub Configuration"
admin.site.index_title = "Manage Your Settings Here"

class UserAdmin(ImportExportModelAdmin):
    resource_class = UserResource
    readonly_fields = ['id']
    list_display = [
        'id', 'username', 'full_name', 'Branch', 'is_active',
        'is_alumni', 'is_student', 'is_superuser','is_allowedToJoinAlumni','is_allowedToAccessSettings','is_allowedToAddAdmin','is_allowedToAccessLinkedinScrappingTab','graduation_month', 'graduation_year',"is_staff",
        'email', 'portfolio_link', 'resume_link', 'mobile',
        'linkedin', 'instagram', 'Github', 'skills',
        'About', 'Work', 'Year_Joined', 'Image'
    ]
    list_filter = ['is_active', 'is_alumni', 'is_student', 'is_superuser','is_allowedToJoinAlumni','is_allowedToAccessSettings', 'is_allowedToAddAdmin','is_allowedToAccessLinkedinScrappingTab','Branch', 'graduation_year', 'Year_Joined']
    actions = ['send_email_action', "send_activation_email_action","update_profiles_action"]
    search_fields = ['id', 'username', 'full_name', 'Branch', 'graduation_year', 'email', 'mobile', 'linkedin', 'instagram', 'Github', 'skills', 'About', 'Work', 'Year_Joined']
    list_display_links = ['id', 'username', 'full_name', 'email', 'mobile', 'linkedin', 'instagram', 'Github']
    ordering = ['username']
    fieldsets = (
        (None, {
            'fields': ('username', 'full_name', 'Branch', 'skills', 'About', 'Work', 'Image')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_superuser', 'is_alumni', 'is_student','is_staff','is_allowedToJoinAlumni','is_allowedToAccessSettings','is_allowedToAddAdmin','is_allowedToAccessLinkedinScrappingTab'),
        }),
        ('Important dates', {
            'fields': ("graduation_month",'graduation_year', 'Year_Joined'),
        }),
        ('Links', {
            'fields': ('portfolio_link', 'resume_link', 'linkedin', 'instagram', 'Github'),
        }),
        ('Contacts', {
            'fields': ('email', 'mobile'),
        }),
    )

    list_per_page = 25
    save_on_top = True

    def send_email_action(self, request, queryset):
        root = tk.Tk()
        root.title("Enter subject and content")
        root.geometry("500x400")
        root.state('normal')
        frame = tk.Frame(root)
        frame.pack(pady=20)

        subject_label = tk.Label(frame, text="Email Subject:")
        subject_label.pack()
        subject_entry = tk.Entry(frame, width=50)
        subject_entry.pack()

        content_label = tk.Label(frame, text="Email Content:")
        content_label.pack()
        content_entry = tk.Text(frame, width=50, height=10)
        content_entry.pack()

       
 
 
        def send_email():
            email_subject = subject_entry.get()
            email_content = content_entry.get("1.0", tk.END)

            if email_subject and email_content:
                for user in queryset:
                    # Prepare email content and context
                    context: dict[str, str] = {
                        'message': email_content,
                        'message3': "Important Notification"  ,
                        'url':"#"
                    }

                    html_message = render_to_string('account/BaseEmail.html', context)
                    plain_message = strip_tags(html_message)

                    # Send email using EmailMultiAlternatives
                    message = EmailMultiAlternatives(
                        subject=email_subject,
                        body=plain_message,
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        to=[user.email]
                    )
                    message.attach_alternative(html_message, "text/html")
                    message.send()

                self.message_user(request, _("Emails have been sent successfully."))
                root.destroy()
            else:
                self.message_user(request, _("Email subject and content are required."), level='ERROR')

        send_button = tk.Button(root, text="Send Email", command=send_email)
        send_button.pack()

        root.mainloop()

    send_email_action.short_description = _("Send email to selected users")

    def update_profiles_action(self, request, queryset):
        current_year = timezone.now().year
        current_month = timezone.now().month

        invalid_users = []

        for user in queryset:
            if user.graduation_year == 0:
                invalid_users.append(user.email)
                continue  

            if user.graduation_year < current_year or (user.graduation_year == current_year and user.graduation_month < current_month):
                if not user.is_alumni:
                    self.convert_to_alumni(user)
            elif user.graduation_year > current_year or (user.graduation_year == current_year and user.graduation_month >= current_month):
                if not user.is_student:
                    self.convert_to_student(user)
            else:
                invalid_users.append(user.email)
            
            user.save()

        if invalid_users:
            subject = "Invalid Graduation Year"
            
            for email in invalid_users:
                context: dict[str, str] = {
                        'message': (
                            "We have noticed that your graduation year is set to 0 or Invalid, "
                            "Please update your profile with a valid graduation year to continue using all features of AlumniHub."
                            "Go to the My Profile section and update your graduation Credentials"
                        ),
                        'url': "http://localhost:3000/login",
                        'message3': "Update Your Profile"
                    }
                
                html_message = render_to_string('account/BaseEmail.html', context)
                plain_message = strip_tags(html_message)

                message = EmailMultiAlternatives(
                            subject=subject,
                            body=plain_message,
                            from_email=settings.DEFAULT_FROM_EMAIL,
                            to=[email]
                                )
                message.attach_alternative(html_message, "text/html")
                message.send()
            
            self.message_user(request, _("Emails sent to users with invalid graduation year."))

        self.message_user(request, _("Profile updates completed."))

    update_profiles_action.short_description = _("Update profiles based on graduation year")

    def convert_to_alumni(self, user):
        # Delete student profile, if exists
        if hasattr(user, 'studentprofile'):
            user.studentprofile.delete()

        # Create alumni profile
        AlumniProfile.objects.create(user=user)
        user.is_alumni = True
        user.is_student = False

    def convert_to_student(self, user):
        # Delete alumni profile, if exists
        if hasattr(user, 'alumniprofile'):
            # Delete associated posts when alumni profile is deleted
            AlumniPost.objects.filter(author=user).delete()
            user.alumniprofile.delete()

        # Create student profile
        StudentProfile.objects.create(user=user)
        user.is_alumni = False
        user.is_student = True
    
    
    def send_activation_email_action(self, request, queryset):
        for user in queryset:
            if not user.is_active:  # Check if the user is inactive
                activation_link = "http://localhost:3000/activate_email"
                email_subject = "Activate Your AlumniHub Account"
                context: dict[str, str] = {
                'user': user.full_name,
                'url': activation_link,
                'message': (
                    "Your account is currently inactive. To activate your account, please click the link below or copy and paste it into your browser."
                ),
                'message3': "Activate Your Account"
                 }

                html_message = render_to_string('account/BaseEmail.html', context)
                plain_message = strip_tags(html_message)

                # Send email using EmailMultiAlternatives
                message = EmailMultiAlternatives(
                    subject=email_subject,
                    body=plain_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,  
                    to=[user.email]
                )
                message.attach_alternative(html_message, "text/html")
                message.send()

        self.message_user(request, _("Activation emails have been sent to inactive users."))

    send_activation_email_action.short_description = _("Send activation email to inactive users")

class AlumniProfileAdmin(ImportExportModelAdmin):
    list_display = [
        'id', 
        'user', 
        'full_name',
        "Heading",
        'current_company_name', 
        'job_title',  
        'Education', 
        'current_city', 
        'current_country', 
        'years_of_experience', 
        'industry',   
        'achievements', 
        'previous_companies',
        'preferred_contact_method', 
    ]
    
    list_filter = [
    'industry',                
    'current_country',        
    'current_city',            
    'years_of_experience',     
    'preferred_contact_method', 
     ]


    search_fields = ['user__username','user__full_name' ,'current_company_name', 'job_title', 'industry']  
    ordering = ['user'] 
    readonly_fields = ['id']
    fieldsets = (
    (None, {
        'fields': ('user', 'full_name','Heading', 'job_title', 'current_city', 'current_country')
    }),
    ('Career Information', {
        'fields': ('current_company_name', 'years_of_experience', 'industry', 'achievements', 'previous_companies')
    }),
    ('Contact Information', {
        'fields': ('preferred_contact_method',)
    }),
    )
    
    list_per_page = 20
    
    save_on_top = True

    actions = ['refresh_profiles']

    def refresh_profiles(self, request, queryset):
        for profile in queryset:
            if not profile.user.is_alumni:
                profile.delete()
                self.message_user(request, f"Deleted alumni profile for {profile.user.username} as they are no longer an alumni.")
            else:
                pass

    refresh_profiles.short_description = "Refresh and delete invalid alumni profiles"
   


class StudentProfileAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'user',
        'full_name',
        'Heading',
        "Education",
        'current_year_of_study',
    ]

    list_filter = [
        'current_year_of_study',  
        'user',                    
    ]
    search_fields = [
        'user__username',  
        'user__full_name',      
        'Heading',                 
        'Education',              
    ]
    list_display_links = [
        'id',                      
        'user',                    
        'Heading',                 
    ]
    ordering = ['user']          
    readonly_fields = ['id']   

    actions = ['refresh_profiles'] 

    def refresh_profiles(self, request, queryset):
        for profile in queryset:
            if not profile.user.is_student:
                profile.delete()
                self.message_user(request, f"Deleted student profile for {profile.user.username} as they are no longer a student.")
            else:
                pass

    refresh_profiles.short_description = "Refresh and delete invalid student profiles"



class HODPrincipalProfileAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'user',
        'full_name',
        'designation',
    ]
    list_filter = [
        'designation',  
        'user',         
    ]
    search_fields = [
        'user__username',  
        'user_full_name',
        'designation',      
    ]
    list_display_links = [
        'id',               
        'user',             
    ]
    ordering = ['user']  
    readonly_fields = ['id']  

    actions = ['refresh_profiles']

    def refresh_profiles(self, request, queryset):
        for profile in queryset:
            # Assuming there's a field to check if user is HOD
            if not profile.user.is_superuser:  # Replace 'is_hod' with the actual field if necessary
                profile.delete()
                self.message_user(request, f"Deleted HOD profile for {profile.user.username} as they are no longer a HOD.")
            else:
                pass

    refresh_profiles.short_description = "Refresh and delete invalid HOD profiles"

class AluminiPostAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'author',
        'full_name',    
        'tag',
        'title',
        "content",
        'image_url',
        'DocUrl',
        'created_at',
        'updated_at',
    ]
    ordering = ['created_at', 'updated_at']


class HodPrincipalPostAdmin(admin.ModelAdmin):
    list_display = ( 'author','full_name', 'title','created_at', 'updated_at')
    search_fields = ('title','author__full_name', 'tag')
    list_filter = ('created_at', 'updated_at')




admin.site.register(User, UserAdmin)
admin.site.register(AlumniProfile, AlumniProfileAdmin)
admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(HODPrincipalProfile, HODPrincipalProfileAdmin)
admin.site.register(HodPrincipalPost, HodPrincipalPostAdmin)
admin.site.register(AlumniPost, AluminiPostAdmin)
