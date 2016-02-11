from django import forms            
from django.contrib.auth.models import User 
from django.contrib.auth.forms import UserCreationForm      

import hashlib

class UserRegistrationForm(UserCreationForm):
	username = forms.EmailField(required = True)
	password1 = forms.CharField(widget=forms.PasswordInput())
        password2 = forms.CharField(widget=forms.PasswordInput())
	wink_username = forms.CharField(label = 'Wink User Name')
	wink_password = forms.CharField(label = 'Wink Password', widget=forms.PasswordInput)


	class Meta:
		model = User
		fields = ('username', 'wink_username', 'wink_password', 'password1', 'password2')

	def clean_email(self):
		email = self.cleaned_data['username']
		try:
			user = User.objects.get(email=email)
			raise forms.ValidationError("This email address already exists. Did you forget your password?")
		except User.DoesNotExist:
			return email

	def save(self,commit = True):   
		user = super(UserRegistrationForm, self).save(commit = False)
		user.username = self.cleaned_data['username']
		user.wink_username = self.cleaned_data['wink_username']
		user.wink_password = self.cleaned_data['wink_password']
		user.set_password(self.cleaned_data['password1'])
		user.email = user.username

		if commit:
			user.save()

		return user

