from django import forms
from ..models import WinkUser


class UserProfile(forms.ModelForm):
	wink_password = forms.CharField(widget=forms.PasswordInput)
	class Meta:
		model = WinkUser
		fields = ('wink_username', 'wink_password',)
