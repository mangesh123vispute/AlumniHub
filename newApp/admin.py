from django.contrib import admin
from newApp.collegeView import AlumniAuthenticationView
from .models import User,AlumniPost


class UserAdmin(admin.ModelAdmin):
    list_display = ['id','username', 'email', 'is_alumni', 'is_college', 'College', 'About', 'Work', 'Year_Joined', 'Branch', 'Image', 'Verified']
    list_filter = ['is_alumni', 'is_college', 'College', 'Verified']

class AlumniAdmin(admin.ModelAdmin):
    list_display = ['id','Alumni','tag', 'content', 'title', 'Image']
    list_filter = ['tag', 'title']

admin.site.register(User, UserAdmin)
admin.site.register(AlumniPost, AlumniAdmin)

