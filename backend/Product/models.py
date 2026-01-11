from django.db import models

# Create your models here.
from django.db import models
from accounts.models import User

class Product(models.Model):
    UNIT_MEASUREMENT=(
        ('gramos','gramos'),
        ('mililitros','mililitros'),
    )
    empresa = models.ForeignKey(User,on_delete=models.SET_NULL, null=True, blank=True, related_name='productos',limit_choices_to={'user_type': 'empresa'})
    nombre = models.CharField(max_length=150)
    descripcion = models.CharField(max_length=150)
    unidad_medida = models.CharField(max_length=30, choices=UNIT_MEASUREMENT)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    iva = models.DecimalField(max_digits=5, decimal_places=2, default=0)        
    descuento = models.DecimalField(max_digits=5, decimal_places=2, default=0) 

    def __str__(self):
        return self.nombre
