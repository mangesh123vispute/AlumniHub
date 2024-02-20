from django.contrib import admin
from newApp.collegeView import AlumniAuthenticationView
from .models import User,AlumniPost


class UserAdmin(admin.ModelAdmin):
    list_display = ['id','username', 'is_alumni', 'is_student',"admin",'email','mobile', 'linkedin', 'instagram', 'skills', 'College', 'About', 'Work', 'Year_Joined', 'Branch', 'Image']
    list_filter = ['is_alumni', 'is_student', 'College',"admin"]

class AlumniAdmin(admin.ModelAdmin):
    list_display = ['id','Alumni','tag', 'content', 'title', 'Image']
    list_filter = ['tag', 'title']

admin.site.register(User, UserAdmin)
admin.site.register(AlumniPost, AlumniAdmin)

