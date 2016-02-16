from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
import settings

from django.contrib import admin
admin.autodiscover()
import views


urlpatterns = patterns('',
        url(r'^$', views.index),
	url(r'^main/$', views.main),
        url(r'^admin/', admin.site.urls),
        url(r'^login/$', views.loginUser),
        url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}),
        url(r'^register/$', views.register),
        url(r'^registerAPI/$', views.registerAPI),
	url(r'^changeAPI/$', views.changeAPI),
	url(r'^getWinkLogin/$', views.getWinkLogin),
	url(r'^renderSettings/$', views.renderSettings),
	url(r'^settings/$', views.settings),
	url(r'^getUserInfo/$', views.getUserInfo),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
