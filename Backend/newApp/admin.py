import tkinter as tk
from django.contrib import admin
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin
from .models import User, AlumniPost
from .resources import UserResource

admin.site.site_header = "SSBT COET-Alumni Admin Portal"
admin.site.site_title = "SSBT COET-Alumni Admin Portal"
admin.site.index_title = "Welcome to  SSBT COET-Alumni Admin Portal"

class UserAdmin(ImportExportModelAdmin):
    resource_class = UserResource
    list_display = ['id','username', 'first_name', 'last_name',  'is_alumni', 'is_student', "is_superuser", 'email', 'mobile', 'linkedin', 'instagram',
                    'skills', 'College', 'About', 'Work', 'Year_Joined','following','followers', 'Branch', 'Image']
    list_filter = ['is_alumni', 'is_student', 'College', "is_superuser", "Branch"]
    actions = ['send_email_action']
    search_fields = ['last_name','first_name','username', 'email','skills','About','Work','Branch','mobile','linkedin','Github','instagram']
    list_display_links = ['id','username', 'first_name', 'last_name',  'is_alumni', 'is_student', "is_superuser", 'email', 'mobile', 'linkedin', 'instagram',
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


class AlumniAdmin(ImportExportModelAdmin):
    list_display = ['id', 'author', 'tag', 'content', 'title', 'Image']
    list_filter = ['author','tag', 'title']


admin.site.register(User, UserAdmin)
admin.site.register(AlumniPost, AlumniAdmin)
