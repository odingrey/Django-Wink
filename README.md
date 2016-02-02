# django-wink
Named because I can't think of anything better.

##Background info
This is a fork off of davidgruhin https://github.com/davidgruhin/WinkPost who ported BillinGlendales https://plus.google.com/+WilliamBeam/posts original Wink Web interface.
<br>
<br>
It's designed to run Django on a live webserver.  It will allow user registration and and passworded login to safely allow multiple users to access their Wink home automation
<br><br>
## Features
We'll call this the Beta version, features include:<br>
Registration/Login/Logout system working<br>
User account holds users wink username and password<br>
davidgruhins code ported successfully and working<br>
User admins have ability to add, change or remove Wink API info (which you have to get from Wink)<br>
New UI applied using [Twitters Bootstrap](http://getbootstrap.com/) and [bootstrap-material-design](http://fezvrasta.github.io/bootstrap-material-design/)<br>



##How To Install
Configure Apache server (or whatever you want, honestly), along with Django and mod_wsgi to point to the wsgi.py file in the main folder.<br>
Navigate to the first wink folder with manage.py and run:<br>
``` bash 
./manage.py migrate
./manage.py createsuperuser
sudo chown [Your username] -R *
sudo chgrp [Apaches group, default is www-data] -R *
cd wink
sudo chown [Apaches group, default is www-data] db.sqlite3
```
As long as everything is configured correctly with Django, it should start right up.  If you want to just test it out, head back to the first wink folder with manage.py and type:<br>
<<<<<<< HEAD
``` bash
./manage.py runserver 0.0.0.0:8000
=======
``` python
./manage.py runserver 0.0.0.0:8000<br><br>
>>>>>>> a1ea5ab210fc18d65cfac361e76a2fad6f75fb8a
```
Then use your browser to navigate to your servers IP address with the :8000 port followed after it.  If you're local, localhost:8000 should do the trick

