from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    # otros campos...


class Calificacion(models.Model):
    producto = models.ForeignKey(
        Producto,
        related_name='calificaciones',
        on_delete=models.CASCADE
    )
    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    valor = models.IntegerField()  # 1 a 5
    fecha = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('producto', 'usuario')  # 1 calificación por usuario
