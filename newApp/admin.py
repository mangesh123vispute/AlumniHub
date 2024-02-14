from django.contrib import admin
from .models import User
from .models import Post

class UserAdmin(admin.ModelAdmin):
    list_display = ['id','username', 'email', 'is_alumni', 'is_college', 'College', 'About', 'Work', 'Year_Joined', 'Branch', 'Image', 'Verified']
    list_filter = ['is_alumni', 'is_college', 'College', 'Verified']

class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'content', 'is_alumni_post', 'is_college_post', 'likes', 'comments']
    list_filter = ['is_alumni_post', 'is_college_post']

admin.site.register(User, UserAdmin)
admin.site.register(Post, PostAdmin)

