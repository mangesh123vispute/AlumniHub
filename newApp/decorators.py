from django.contrib.auth import REDIRECT_FIELD_NAME
from django.contrib.auth.decorators import user_passes_test
from django.contrib import messages
from django.shortcuts import redirect
from django.urls import reverse

from functools import wraps

def alumni_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login'):
    actual_decorator = user_passes_test(
        lambda u: u.is_active and not u.is_student,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    return actual_decorator(function) if function else actual_decorator


def college_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login'):
    actual_decorator = user_passes_test(
        lambda u: u.is_active and u.is_college,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    return actual_decorator(function) if function else actual_decorator


def admin_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login'):
    actual_decorator = user_passes_test(
        lambda u: u.is_active and u.is_superuser,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )
    return actual_decorator(function) if function else actual_decorator




from functools import wraps
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib import messages

def check_profile_completion(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
      
  
        if  not request.user.is_authenticated or ( not (request.user.is_alumni and request.user.is_student)):
            return view_func(request, *args, **kwargs)
        
        required_fields = ['username', 'first_name', 'last_name', 'email', 'Branch', 'skills', 'linkedin', 'Work', 'About']
        user = request.user
        empty_fields = [field for field in required_fields if not getattr(user, field, None)]
        
        if not empty_fields:
            return view_func(request, *args, **kwargs)
        else:
            # Check if the current URL is already the alumni-profile page
            if request.path == reverse('alumni-profile', kwargs={'pk': user.pk}):
                # If already on the alumni-profile page, don't redirect, just return
                messages.error(request, f"Please fill in the following required fields: {', '.join(empty_fields)}.")
                return view_func(request, *args, **kwargs)
            else:
                # Redirect user to alumni-profile page
                messages.error(request, f"Please fill in the following required fields: {', '.join(empty_fields)}.")
                return redirect(reverse('alumni-profile', kwargs={'pk': user.pk}))
    
    return wrapped_view
