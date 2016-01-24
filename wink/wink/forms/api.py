from django import forms            
from ..models import WinkAPI

class APIForm(forms.ModelForm):
		
	client_id = forms.CharField(label = 'Client ID')
	client_password = forms.CharField(label = 'Client Password')

	class Meta:
		model = WinkAPI
		fields = ('client_id', 'client_password')

