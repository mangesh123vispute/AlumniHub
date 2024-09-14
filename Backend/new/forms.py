from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm

User = get_user_model()

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(
        label='Password',
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'type': 'password','placeholder': 'Password' })
    )
    password2 = forms.CharField(
        label='Confirm Password',
        widget=forms.PasswordInput(attrs={'class': 'form-control','type': 'password','placeholder': 'Confirm Password' })
    )
    email = forms.EmailField(
            required=True,
            label='Email',
            widget=forms.EmailInput(attrs={'class': 'form-control','type': 'email','placeholder': 'Email' })
        )
    username = forms.CharField(
        required=True,
        label='Username',
        widget=forms.TextInput(attrs={'class': 'form-control','type': 'text' ,'placeholder': 'Username'})
    )
    first_name = forms.CharField(
        required=True,
        label='First Name',
        widget=forms.TextInput(attrs={'class': 'form-control','type': 'text','placeholder': 'First Name'})
    )
    last_name = forms.CharField(
        required=True,
        label='Last Name',
        widget=forms.TextInput(attrs={'class': 'form-control','type': 'text','placeholder': 'Last Name'})
    )
    is_alumni = forms.BooleanField(
        required=False,
        label='Are you an Alumni?',
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input','placeholder': 'Are you an alumni?'})
    )
    is_student = forms.BooleanField(
        required=False,
        label='Are you a Student?',
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input','placeholder': 'Are you a student?'})
    )

    class Meta:
        model = User
        fields = [
            'username', 'email', 'first_name', 'last_name', 'is_alumni', 'is_student'
        ]

    def clean_password2(self):
        cd = self.cleaned_data
        if cd.get('password') != cd.get('password2'):
            raise forms.ValidationError('Passwords do not match.')
        return cd.get('password2')




class UserLoginForm(AuthenticationForm):
    username = forms.CharField(
        label='Username',
        widget=forms.TextInput(attrs={
            'class': 'form-control', 
            'placeholder': 'Username'
        })
    )
    password = forms.CharField(label='Password', widget=forms.PasswordInput(attrs={'class': 'form-control ',
        'placeholder': '**********'}))  
    
  