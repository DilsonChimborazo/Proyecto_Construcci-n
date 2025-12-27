from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone 
from accounts.api.managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    # modelo para creacion de usuarios
    USER_TYPE_CHOICE = (
        ('cliente', 'cliente'),
        ('empresa', 'empresa'),
    )

    cedula_nit = models.BigIntegerField(primary_key=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True)
    user_type = models.CharField(max_length=10, choices= USER_TYPE_CHOICE)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    photo = models.ImageField(upload_to='perfil/', null=True,blank=True)
    password = models.CharField(max_length=255)
    
    #campo que django utilizara para el login
    USERNAME_FIELD = 'email'

    #campos obligatorios para crear un usuario
    REQUIRED_FIELDS = ['cedula_nit', 'full_name']
    objects = UserManager()

    def __str__(self):
        return self.email


