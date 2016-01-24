from django import forms
from ..models import WinkUser


class UserProfile(forms.ModelForm):
	class Meta:
		model = WinkUser
		fields = ('wink_username', 'wink_password',)
