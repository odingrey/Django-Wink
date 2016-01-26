from django.db import models
from django.contrib.auth.models import (
	BaseUserManager, AbstractBaseUser
)

class WinkAPI(models.Model):
	client_id = models.CharField(max_length=100)
	client_password = models.CharField(max_length=100)

#	def __unicode__(self):
#		return unicode(self.client_id)




class WinkUserManager(BaseUserManager):
	def create_user(self, email, wink_username, wink_password, password=None):
		"""
		Creates and saves a User with the given email and password.
		"""
		if not email:
			raise ValueError('Users must have an email address')

		user = self.model(
			email=self.normalize_email(email),
			wink_username = wink_username,
			wink_password = wink_password,
		)

		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, wink_username, wink_password, password):
		"""
		Creates and saves a superuser with the given email and password.
		"""
		user = self.create_user(email,
			password=password,
			wink_username = wink_username,
			wink_password = wink_password,
		)
		user.is_admin = True
		user.save(using=self._db)
		return user


class WinkUser(AbstractBaseUser):
	email = models.EmailField(
		verbose_name='email address',
		max_length=255,
		unique=True,
	)
	wink_username = models.CharField(max_length=100)
	wink_password = models.CharField(max_length=100)
	is_active = models.BooleanField(default=True)
	is_admin = models.BooleanField(default=False)

	objects = WinkUserManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['wink_username', 'wink_password']

	def get_full_name(self):
		# The user is identified by their email address
		return self.email

	def get_short_name(self):
		# The user is identified by their email address
		return self.email

	def __str__(self):				# __unicode__ on Python 2
		return self.email

	def has_perm(self, perm, obj=None):
		"Does the user have a specific permission?"
		# Simplest possible answer: Yes, always
		return True

	def has_module_perms(self, app_label):
		"Does the user have permissions to view the app `app_label`?"
		# Simplest possible answer: Yes, always
		return True

	@property
	def is_staff(self):
		"Is the user a member of staff?"
		# Simplest possible answer: All admins are staff
		return self.is_admin
