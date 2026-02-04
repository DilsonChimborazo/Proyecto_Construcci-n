from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

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
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE
)
    valor = models.IntegerField()  
    fecha = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('producto', 'usuario')  
