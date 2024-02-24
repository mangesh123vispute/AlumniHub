from django.shortcuts import redirect, render
from django.views.generic import CreateView
from .models import User
from .forms import AlumniSignupForm, RegistrationForm,StudentSignupForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .decorators import alumni_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.shortcuts import get_object_or_404



# This is for the alumni
class SignupView(CreateView):   
    model = User
    form_class = AlumniSignupForm
    template_name = 'registration/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'alumni'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save(commit=False)
        user.is_alumni = True  
        user.save()
        login(self.request, user)
        return redirect('alumni-profile',self.request.user.id)


# This is for the student 
class StudentSignupView(CreateView):
    model = User
    form_class = StudentSignupForm
    template_name = 'registration/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'student'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save(commit=False)
        user.is_student = True
        user.save()
        login(self.request, user)
        return redirect('alumni-profile',self.request.user.id)


@login_required
def profile(request,pk):
    if request.method == 'POST':
        u_form = RegistrationForm(request.POST,request.FILES, instance=request.user)
        if u_form.is_valid():
            u_form.save()
            return redirect('alumni-profile',pk)

    else:
        u_form = RegistrationForm(instance=request.user)

    context = {
        'form': u_form
    }
    return render(request, 'registration.html', context)


