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


@check_profile_completion
def home(request):
   
    return render(request, 'home.html')

@login_required
@check_profile_completion
def AlumniListView(request):
    total = User.objects.filter(is_alumni=True).all()
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
    return render(request, template_name, {'filter': alfilter, 'page_obj': page_obj})


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
                Alumni=request.user
                tag=form.cleaned_data['tag']
                title=form.cleaned_data['title']
                content=form.cleaned_data['content']
                image=form.cleaned_data['Image']
                print(Alumni,tag,title,content,image)
                alumnipost=AlumniPost(Alumni=Alumni,tag=tag,title=title,content=content,Image=image)
                alumnipost.save()
                return redirect('AlumniPostlist')
        else:
            form = AlumniPostForm()
        return render(request, 'post/post.html', {'form': form})
    except Exception as e:
        print(e)
        return render(request, 'post/postlist.html')

# read 
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





