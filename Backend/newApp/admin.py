import tkinter as tk
from django.contrib import admin
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from django.utils import timezone
from .models import User, AlumniPost, AlumniProfile, StudentProfile,HODPrincipalProfile,HodPrincipalPost,AlumniCredentials
from .resources import UserResource
from django.contrib.auth.models import Permission
admin.site.site_header = "AlumniHub Settings"
admin.site.site_title = "AlumniHub Configuration"
admin.site.index_title = "Manage Your Settings Here"

class UserAdmin(ImportExportModelAdmin):
    resource_class = UserResource
    readonly_fields = ['id']
    list_display = [
        'id', 'username', 'full_name', 'Branch', 'is_active',
        'is_alumni', 'is_student', 'is_superuser','graduation_month', 'graduation_year',"is_staff",
        'email', 'portfolio_link', 'resume_link', 'mobile',
        'linkedin', 'instagram', 'Github', 'skills',
        'About', 'Work', 'Year_Joined', 'Image'
    ]
    list_filter = ['is_active', 'is_alumni', 'is_student', 'is_superuser', 'Branch', 'graduation_year', 'Year_Joined']
    actions = ['send_email_action', "send_activation_email_action","update_profiles_action"]
    search_fields = ['id', 'username', 'full_name', 'Branch', 'graduation_year', 'email', 'mobile', 'linkedin', 'instagram', 'Github', 'skills', 'About', 'Work', 'Year_Joined']
    list_display_links = ['id', 'username', 'full_name', 'email', 'mobile', 'linkedin', 'instagram', 'Github']
    ordering = ['username']
    fieldsets = (
        (None, {
            'fields': ('username', 'full_name', 'Branch', 'skills', 'About', 'Work', 'Image')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_superuser', 'is_alumni', 'is_student','is_staff'),
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
                    send_mail(
                        email_subject,
                        email_content,
                        'mangesh2003vispute@gmail.com',
                        [user.email],
                        fail_silently=False,
                    )
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
        invalid_users = []

        for user in queryset:
          
            if user.graduation_year == 0:
                invalid_users.append(user.email)
                continue  

            if user.graduation_year < current_year and not user.is_alumni:
                self.convert_to_alumni(user)
            elif user.graduation_year >= current_year and not user.is_student:
                self.convert_to_student(user)
            
            user.save()

        if invalid_users:
            subject = "Invalid Graduation Year"
            message = (
                "Dear user,\n\n"
                "We have noticed that your graduation year is set to 0, which is invalid. "
                "Please update your profile with a valid graduation year to continue using all features of AlumniHub.\n\n"
                "You can update your profile by clicking the link below:\n"
                "http://localhost:3000/\n\n"
                "Best regards,\n"
                "AlumniHub Team"
            )
            
            for email in invalid_users:
                send_mail(
                    subject,
                    message,
                    'mangesh2003vispute@gmail.com',  # Sender email
                    [email],  # Recipient email
                    fail_silently=False,
                )
            
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
                email_content = (
                    "Dear {},\n\n"
                    "Your account is currently inactive. To activate your account, please click the link below:\n\n"
                    "Click here: {}\n\n"
                    "Or copy and paste this link into your browser: {}\n\n"
                    "Best regards,\n"
                    "The AlumniHub Team"
                ).format(user.full_name, activation_link, activation_link)

                send_mail(
                    email_subject,
                    email_content,  # Use plain text content
                    'mangesh2003vispute@gmail.com',  # Sender email address
                    [user.email],  # Recipient email
                    fail_silently=False,
                )

        self.message_user(request, _("Activation emails have been sent to inactive users."))

    send_activation_email_action.short_description = _("Send activation email to inactive users")

class AlumniProfileAdmin(ImportExportModelAdmin):
    list_display = [
        'id', 
        'user', 
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


    search_fields = ['user__username', 'current_company_name', 'job_title', 'skills', 'industry']  
    ordering = ['user'] 
    readonly_fields = ['id']
    fieldsets = (
    (None, {
        'fields': ('user', 'Heading', 'job_title', 'current_city', 'current_country')
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
        'designation',
    ]
    list_filter = [
        'designation',  
        'user',         
    ]
    search_fields = [
        'user__username',  
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
    list_display = ('title', 'author', 'created_at', 'updated_at')
    search_fields = ('title', 'author__full_name', 'tag')
    list_filter = ('created_at', 'updated_at')

class AlumniCredentialsAdmin(admin.ModelAdmin):
    list_display = ('user', 'fourth_year_marksheet', 'lc', 'id_card', 'graduation_certificate')
    search_fields = ('user__username', 'user__email')  # Allow searching by username and email
    list_filter = ('user__is_active',)  # Filter by user activity status

    def has_change_permission(self, request, obj=None):
        # Optionally restrict permissions based on custom logic
        return super().has_change_permission(request, obj)

    def has_delete_permission(self, request, obj=None):
        # Optionally restrict delete permissions based on custom logic
        return super().has_delete_permission(request, obj)

admin.site.register(AlumniCredentials, AlumniCredentialsAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(AlumniProfile, AlumniProfileAdmin)
admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(HODPrincipalProfile, HODPrincipalProfileAdmin)
admin.site.register(HodPrincipalPost, HodPrincipalPostAdmin)
admin.site.register(AlumniPost, AluminiPostAdmin)
