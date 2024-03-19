from django.contrib import admin
from django.core.mail import send_mail
from django.utils.translation import gettext_lazy as _

from .models import User, AlumniPost

class UserAdmin(admin.ModelAdmin):
    list_display = ['id','username', 'is_alumni', 'is_student',"admin",'email','mobile', 'linkedin', 'instagram', 'skills', 'College', 'About', 'Work', 'Year_Joined', 'Branch', 'Image']
    list_filter = ['is_alumni', 'is_student', 'College',"admin"]
    actions = ['send_email_action']  

    def send_email_action(self, request, queryset):
        # Assuming queryset contains filtered users
        success_count = 0
        for user in queryset:
            try:
                send_mail(
                    'Subject here',
                    'Here is the message.',
                    'mangesh2003vispute@gmail.com',
                    [user.email],
                    fail_silently=False,
                )
                success_count += 1
            except Exception as e:
                self.message_user(request, f"Failed to send email to {user.email}: {str(e)}", level='error')
        
        if success_count > 0:
            self.message_user(request, _(f"Emails have been sent successfully to {success_count} users."))

    send_email_action.short_description = _("Send email to selected users")

class AlumniAdmin(admin.ModelAdmin):
    list_display = ['id','Alumni','tag', 'content', 'title', 'Image']
    list_filter = ['tag', 'title']

admin.site.register(User, UserAdmin)
admin.site.register(AlumniPost, AlumniAdmin)
