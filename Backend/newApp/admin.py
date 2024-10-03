import tkinter as tk
from django.contrib import admin
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from .models import User, AlumniPost,AlumniProfile,AlumniExperience,StudentProfile,HODPrincipalProfile,JobPost, Event, Feedback, Donation, AlumniPost
from .resources import UserResource

admin.site.site_header = "AlumniHub Admin"
admin.site.site_title = "AlumniHub Admin Portal"
admin.site.index_title = "Welcome to  AlumniHub Admin Portal"

class UserAdmin(ImportExportModelAdmin):
    resource_class = UserResource
    list_display = ['id','username', 'full_name',  "is_active", 'is_alumni', 'is_student', "is_superuser", 'email', 'mobile', 'linkedin', 'instagram',
                    'skills', 'College', 'About', 'Work', 'Year_Joined','following','followers', 'Branch', 'Image']
    list_filter = ['is_alumni', 'is_student', 'College', "is_superuser", "Branch"]
    actions = ['send_email_action']
    search_fields = ['username', 'email','skills','About','Work','Branch','mobile','linkedin','Github','instagram']
    list_display_links = ['id','username',    'is_alumni', 'is_student', "is_superuser", 'email', 'mobile', 'linkedin', 'instagram',
                    'skills', 'College', 'About', 'Work', 'Year_Joined','following','followers', 'Branch', 'Image']

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
        'graduation_year', 
        'Education', 
        'current_city', 
        'current_country', 
        'years_of_experience', 
        'industry', 
        'skills', 
        'profile_picture_url', 
        'is_available_for_mentorship', 
        'achievements', 
        'publications', 
        'projects', 
        'previous_companies', 
        'successful_referrals', 
        'preferred_contact_method', 
        'resume_url'
    ]
    
    list_filter = [
        'current_company_name', 
        'job_title', 
        'graduation_year', 
        'current_city', 
        'current_country', 
        'industry', 
        'is_available_for_mentorship', 
        'preferred_contact_method'
    ]

    search_fields = ['user__username', 'current_company_name', 'job_title', 'skills', 'industry']  # Add searchable fields

    ordering = ['graduation_year']

class AlumniExperienceAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'alumni_profile', 
        'company_name', 
        'job_title', 
        'start_date', 
        'end_date', 
        'description', 
        'CurrentlyWorking', 
        'responsibilities', 
        'location_city', 
        'location_country'
    ]
    
    list_filter = [
        'alumni_profile', 
        'company_name', 
        'job_title', 
        'start_date', 
        'CurrentlyWorking', 
        'location_city', 
        'location_country'
    ]

    search_fields = ['alumni_profile__user__username', 'company_name', 'job_title', 'location_city', 'location_country']  # Add searchable fields

    ordering = ['start_date']

class StudentProfileAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'user',
        'resume_url',
        'graduation_year',
        'current_year_of_study',
        'department',
        'cgpa',
        'is_available_for_internship',
    ]

    list_filter = [
        'graduation_year',
        'current_year_of_study',
        'department',
        'is_available_for_internship',
    ]

    search_fields = ['user__username', 'user__full_name', 'department']  # Add searchable fields

    ordering = ['graduation_year'] 

class AlumniAdmin(ImportExportModelAdmin):
    list_display = ['id', 'author', 'tag', 'content', 'title', 'Image']
    list_filter = ['author','tag', 'title']

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

class JobPostAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'alumni',
        'title',
        'description',
        'location',
        'salary',
        'date_posted',
    ]
    list_filter = ['alumni', 'location', 'salary', 'date_posted']
    search_fields = ['title', 'description', 'alumni__user__full_name']
    ordering = ['date_posted']




# Event Admin
class EventAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'title',
        'description',
        'event_date',
        'location',
        'created_by',
    ]
    list_filter = ['event_date', 'created_by']
    search_fields = ['title', 'description', 'created_by__user__full_name']
    ordering = ['event_date']




# Feedback Admin
class FeedbackAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'alumni',
        'feedback_text',
        'created_at',
    ]
    list_filter = ['alumni', 'created_at']
    search_fields = ['feedback_text', 'alumni__user__full_name']
    ordering = ['created_at']




# Donation Admin
class DonationAdmin(ImportExportModelAdmin):
    list_display = [
        'id',
        'alumni',
        'amount',
        'date_donated',
        'purpose',
    ]
    list_filter = ['alumni', 'date_donated', 'purpose']
    search_fields = ['alumni__user__full_name', 'purpose']
    ordering = ['date_donated']






admin.site.register(User, UserAdmin)
admin.site.register(AlumniProfile, AlumniProfileAdmin)
admin.site.register(AlumniPost, AlumniAdmin)
admin.site.register(AlumniExperience, AlumniExperienceAdmin)
admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(HODPrincipalProfile, HODPrincipalProfileAdmin)
admin.site.register(Donation, DonationAdmin)
admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(JobPost, JobPostAdmin)