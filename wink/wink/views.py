from django.template import RequestContext
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.http import JsonResponse

from django.contrib import auth
from django.contrib.auth.decorators import login_required

from forms.register import UserRegistrationForm
from forms.user import UserProfile
from forms.api import APIForm

from models import WinkAPI

def index(request):
	return render(request, 'index.html')

def main(request):
	winkAPI = WinkAPI.objects.all()
	if not winkAPI:
		return HttpResponseRedirect('/registerAPI')
	user = request.user
	if user.is_authenticated():
		content = {
			'user' : user,
			'name' : user.email,
			'wink_username' : user.wink_username,
			'wink_password' : user.wink_password
		}
	    	return render(request, 'main.html', content)
	return HttpResponseRedirect('/login')


def register(request):
	#TODO(mike): Redirect failed registration into correct window instead of new one
	registered = False
	if request.method == 'POST':
		user_form = UserRegistrationForm(data=request.POST)  #Fills form with POST data
		profile_form = UserProfile(data=request.POST)
		if user_form.is_valid() and profile_form.is_valid():
			user = user_form.save()
			user.save()			#saves new user
			profile = profile_form.save(commit=False)
			profile.user = user
			profile.save()			# saves new user profile
			registered = True
		else:
			print user_form.errors, profile_form.errors  #Will output to apache's error.log

	else:
		user_form = UserRegistrationForm() #creates forms to pass to the front end for filling out
		profile_form = UserProfile()

	return render(request, 'register.html', {'user_form': user_form, 'profile_form': profile_form, 'registered': registered})


def getWinkLogin(request):
	user = request.user
	winkAPI = WinkAPI.objects.all()[0]
        if user.is_authenticated():
                content = {
                        'wink_username' : user.wink_username,
                        'wink_password' : user.wink_password,
			'api_id' : winkAPI.client_id,
			'api_password' : winkAPI.client_password,
                }

	return JsonResponse(content)

def registerAPI(request):
        if request.method == 'POST':
		form = APIForm(request.POST)
		if form.is_valid():
			data = form.save()
		        return HttpResponseRedirect('/')
	else:
		form = APIForm()
	return render(request, 'registerAPI.html', {'form': form})

def changeAPI(request):
	if request.user.is_staff:
		content = {
			'user': user
		}
		return render(request, 'changeAPI.html', content)
	return HttpResponse(status=401)

def settings(request):
	return render(request, 'settings.html')