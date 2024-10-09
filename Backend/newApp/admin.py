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
    list_display = ['id','username', 'full_name', 'Branch', "is_active", 'is_alumni', 'is_student',"is_superuser",'graduation_year',  'email', 'mobile', 'linkedin', 'instagram',"Github",
                    'skills', 'About', 'Work', 'Year_Joined',  'Image']
    list_filter = ['is_active', 'is_alumni', 'is_student', 'is_superuser', 'Branch', 'graduation_year', 'Year_Joined']
    actions = ['send_email_action']
    search_fields = ['id', 'username', 'full_name', 'Branch', 'graduation_year', 'email', 'mobile', 'linkedin', 'instagram', 'Github', 'skills', 'About', 'Work', 'Year_Joined']
    list_display_links = ['id', 'username', 'full_name', 'email', 'mobile', 'linkedin', 'instagram', 'Github']
    ordering = ['username']  
    readonly_fields = ['id', 'graduation_year']
    fieldsets = (
    (None, {
        'fields': ('username', 'full_name', 'email')
    }),
    ('Permissions', {
        'fields': ('is_active', 'is_superuser')
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
    readonly_fields = ['id', 'current_company_name']
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