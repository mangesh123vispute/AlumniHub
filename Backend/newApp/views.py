from django.shortcuts import render,redirect, get_object_or_404
from django.shortcuts import get_object_or_404
from .models import User,AlumniPost
from django.views.generic import View
from .filters import AlumniFilter
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger    
from django.shortcuts import redirect
from django.contrib import messages
from .forms import AlumniPostForm
from django.contrib.auth.decorators import login_required
from .decorators import check_profile_completion
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
import json


@check_profile_completion
def home(request):
   
    return render(request, 'home.html')

@login_required
@check_profile_completion
def AlumniListView(request):
    total = User.objects.filter(is_alumni=True).all()
    totallength=total.count()
    alfilter = AlumniFilter(request.GET, queryset=total)
    template_name = 'showalumni.html'
    paginator = Paginator(alfilter.qs, 5)
    page_number = request.GET.get('page')
    try:
        page_obj = paginator.page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    return render(request, template_name, {'filter': alfilter, 'page_obj': page_obj, 'title': "Alumni",'totallength':totallength})


def CollegeListView(request):
    total = User.objects.filter(is_college=True).all()  
    template_name = 'showcollege.html'
    paginator = Paginator(total, 5)
    page_number = request.GET.get('page')
    try:
        page_obj = paginator.page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    return render(request, template_name, {'filter': total, 'page_obj': page_obj})


class CollegeDetailView(View):
    
    def get(self, request, *args, **kwargs):
        college = get_object_or_404(User, pk=kwargs['pk'])
        alumnis = User.objects.filter(is_college=False).filter(College=college.College).filter(Verified=True).all()
        context = {'college': college,'alumnis':alumnis}
        return render(request, "college.html", context)


class AlumniDetailView(View):
    def get(self, request, *args, **kwargs):
        alumni = get_object_or_404(User, pk=kwargs['pk'])
        context = {'alumni': alumni}
        return render(request, "alumni.html", context)



# create 
@login_required
def AlumniAddPost(request):
    try:
        if request.method == 'POST':
            form = AlumniPostForm(request.POST, request.FILES)
            if form.is_valid():
                author=request.user
                tag=form.cleaned_data['tag']
                title=form.cleaned_data['title']
                content=form.cleaned_data['content']
                image=form.cleaned_data['Image']
                print(author,tag,title,content,image)
                alumnipost=AlumniPost(author=author,tag=tag,title=title,content=content,Image=image)
                alumnipost.save()
                return redirect('AlumniPostlist')
        else:
            form = AlumniPostForm()
        return render(request, 'post/post.html', {'form': form})
    except Exception as e:
        print(e)
        return render(request, 'post/postlist.html')

# read all posts of all authors
@login_required
@check_profile_completion
def AlumniPostList(request):
    try: 
        alumniposts = AlumniPost.objects.all()
        return render(request, 'post/postlist.html', {'alumniposts': alumniposts,"request":request})
    except AlumniPost.DoesNotExist:
        return render(request, 'post/postlist.html')


# delete 
# logged in user is only able to delete the post if it is created by him
# id of looged in user === id of the alumni post
@login_required
def AlumniPostDelete(request, id):
    try:
        alumnipost = get_object_or_404(AlumniPost, id=id)
        print(alumnipost,id)

        loggedinuserid = request.user.id
        print(alumnipost.Alumni.id, loggedinuserid)
        if loggedinuserid == alumnipost.Alumni.id:
            alumnipost.delete()
            messages.success(request, "Post deleted successfully")
        else:
            messages.error(request, "You are not authorized to delete this post, You can only delete your own posts")
        return redirect('AlumniPostlist')
    except AlumniPost.DoesNotExist:
        return render(request, 'post/postlist.html')

        
# edit post
# logged in user is only able to edit the post if it is created by him
# id of looged in user === id of the alumni post
@login_required
def AlumniPostEdit(request, id):
    try:
        alumnipost = get_object_or_404(AlumniPost, id=id)
        loggedinuserid = request.user.id
        if loggedinuserid == alumnipost.Alumni.id:
            if request.method == 'POST':
                form = AlumniPostForm(request.POST, request.FILES, instance=alumnipost)
                if form.is_valid():
                    form.save()
                    messages.success(request, "Post updated successfully")  
                    return redirect('AlumniPostlist')
            else:
                form = AlumniPostForm(instance=alumnipost)
            return render(request, 'post/post.html', {'form': form})
        else:
            messages.error(request, "You are not authorized to edit this post, You can only edit your own posts")
            return redirect('AlumniPostlist')
    except Exception as e:
        print(e)
        return render(request, 'post/postlist.html')

# get Alumni id , find alumni by id
# if request.user.id present in the follow least then remove it 
# if not present then add it 

from django.shortcuts import redirect

@login_required
def Follow(request, id):
    alumni = get_object_or_404(User, id=id)
    user = request.user
    alumnifollower = alumni.get_followers()
    userfollowing = user.get_following()
    
    # Follow
    if str(user.id) not in alumnifollower:
        alumnifollower.append(user.id)
        alumni.set_followers(alumnifollower)
        userfollowing.append(alumni.id)
        user.set_following(userfollowing)
        messages.success(request, f"You are now following {alumni.first_name} {alumni.last_name}")
    # Unfollow
    else:
        alumnifollower.remove(str(user.id))
        alumni.set_followers(alumnifollower)
        userfollowing.remove(str(alumni.id))
        user.set_following(userfollowing)
        messages.success(request, f"You are no longer following {alumni.first_name} {alumni.last_name}")

    alumni.save()
    user.save()

    return redirect('alumni-detail', pk=id)


# read all post of specific author
@login_required
def AlumniPosts(request, author_username): 
    print("i am getting callled",author_username)
    author = get_object_or_404(User, username=author_username)
    try: 
        alumniposts = author.alumnipost_set.all()
        print("These are the alumni posts:", alumniposts)
        return render(request, 'post/postlist.html', {'alumniposts': alumniposts, "request": request})
    except AlumniPost.DoesNotExist:
        #
        return render(request, 'post/postlist.html', {'alumniposts': [], "request": request})

# show all followers of a user
@login_required
def Followers(request,id):
    user=User.objects.get(id=id)
    followers=user.get_followers()
    integerfollowers=[]
    for i in followers:
        integerfollowers.append(int(i))    
    total = User.objects.filter(id__in=integerfollowers).all()
    totallength=total.count()
    alfilter = AlumniFilter(request.GET, queryset=total)
    template_name = 'showalumni.html'
    paginator = Paginator(alfilter.qs, 5)
    page_number = request.GET.get('page')
    try:
        page_obj = paginator.page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    return render(request, template_name, {'filter': alfilter, 'page_obj': page_obj, 'title': "Followers",'totallength':totallength})


# show all following of a user
@login_required
def Following(request,id):
    user=User.objects.get(id=id)
    following=user.get_following()
    integerfollowing=[]
    for i in following:
        integerfollowing.append(int(i))    
    total = User.objects.filter(id__in=integerfollowing).all()
    totallength=total.count()
    alfilter = AlumniFilter(request.GET, queryset=total)
    template_name = 'showalumni.html'
    paginator = Paginator(alfilter.qs, 5)
    page_number = request.GET.get('page')
    try:
        page_obj = paginator.page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)
    return render(request, template_name, {'filter': alfilter, 'page_obj': page_obj, 'title': "Following",'totallength':totallength})


def role_selection_view(request, user_id):
    user = get_object_or_404(User, id=user_id)

    if request.method == 'POST':
        role = request.POST.get('role')
        if role == 'alumni':
            user.is_alumni = True
        elif role == 'student':
            user.is_student = True
        elif role == 'faculty':
            user.is_superuser = True  # Assuming faculty is treated as superuser

        user.save()
        return redirect('role_selection_success')  # You can redirect to a success page

    return render(request, 'role_selection_form.html', {'user': user})

def role_selection_success(request):
    return render(request, 'role_selection_success.html')



# views using amdinlte 
def base(request):
    return render(request, 'website/base.html')

def profile(request):
    return render(request, 'website/pages/profile.html')