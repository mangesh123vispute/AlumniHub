import tkinter as tk
from django.contrib import admin
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from .models import User, AlumniPost,AlumniProfile,StudentProfile,HODPrincipalProfile,HodPrincipalPost
from .resources import UserResource

admin.site.site_header = "AlumniHub Settings"
admin.site.site_title = "AlumniHub Configuration"
admin.site.index_title = "Manage Your Settings Here"


class UserAdmin(ImportExportModelAdmin):
    resource_class = UserResource
    list_display = ['id','username', 'full_name',  "is_active", 'is_alumni', 'is_student','graduation_year', "is_superuser", 'email', 'mobile', 'linkedin', 'instagram',
                    'skills', 'About', 'Work', 'Year_Joined', 'Branch', 'Image']
    list_filter = ['is_alumni', 'is_student', "is_superuser", "Branch"]
    actions = ['send_email_action']
    search_fields = ['username', 'email','skills','About','Work','Branch','mobile','linkedin','Github','instagram']
    list_display_links = ['id','username',    'is_alumni', 'is_student', "is_superuser", 'email', 'mobile', 'linkedin', 'instagram',
                    'skills', 'About', 'Work', 'Year_Joined', 'Branch', 'Image']

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

class AlumniProfileAdmin(ImportExportModelAdmin):
    list_display = [
        'id', 
        'user', 
        'current_company_name', 
        'job_title',  
        'Education', 
        'current_city', 
        'current_country', 
        'years_of_experience', 
        'industry',  
        'profile_picture_url', 
        'achievements', 
        'preferred_contact_method', 
    ]
    
    list_filter = [
        'current_company_name', 
        'job_title', 
        'current_city', 
        'current_country', 
        'industry', 
        'preferred_contact_method'
    ]

    search_fields = ['user__username', 'current_company_name', 'job_title', 'skills', 'industry']  


class StudentProfileAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'user',
        'current_year_of_study',
        'department',
    ]

    list_filter = [
        'current_year_of_study',
        'department', 
    ]

    search_fields = ['user__username', 'user__full_name', 'department']  # Add searchable fields



class HODPrincipalProfileAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'user',
        'department',
        'designation',
    ]

    list_filter = [
        'department',
        'designation',
    ]

    search_fields = ['user__username', 'user__full_name', 'department', 'designation']  # Add searchable fields

    ordering = ['designation'] 

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



admin.site.register(User, UserAdmin)
admin.site.register(AlumniProfile, AlumniProfileAdmin)
admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(HODPrincipalProfile, HODPrincipalProfileAdmin)
admin.site.register(HodPrincipalPost, HodPrincipalPostAdmin)
admin.site.register(AlumniPost, AluminiPostAdmin)