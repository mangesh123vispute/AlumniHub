from django.shortcuts import redirect, render
from django.views.generic import CreateView
from .models import User,Post
from .forms import AlumniSignupForm, RegistrationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .decorators import alumni_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse

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


@login_required
@alumni_required
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


# * post (alumni / college)
# *Add post by alumni or college 
# check if user is logged in 
# get the data from the request body 
# create the new post object 
# add the data to the post object 
# save the post object 
# redirect to the profile page


# condition to be added
# if request.user.is_authenticated:

 # else:
        #     response_data = {'status': 'error', 'message': 'User not authenticated'}
        #     return JsonResponse(response_data, status=400)  

# post.user = request.user.id 

@csrf_exempt
@require_POST

def post(request): 
   
    try: 
            user_id=request.POST.get('user',0)
            post = Post() 
            post.user=User.objects.get(id=user_id)
            content = request.POST.get('content', '')
            if not content:
                response_data = {'status': 'error', 'message': 'Content is required'}
                return JsonResponse(response_data, status=400)
            post.content = content

            post.comments = request.POST.get('comments', '')

            likes = request.POST.get('likes', 0)
            post.likes = int(likes) 
           
            # enter 0 or 1 
            post.is_alumni_post = bool(int(request.POST.get('is_alumni_post', "0")))
            post.is_college_post = bool(int(request.POST.get('is_college_post', "0")))
            
            post.save()
            response_data = {'status': 'success', 'message': 'Post created successfully'}
            return JsonResponse(response_data)
       
    except Exception as e:
        response_data = {'status': 'error', 'message': str(e)}
        return JsonResponse(response_data, status=400)
