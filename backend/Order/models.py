from django.db import models
from accounts.models import User

class Order(models.Model):
    STATE=(
        ('solicitado','solicitado'),
        ('en proceso','en proceso'),
        ('en camino','en camino'),
        ('entregado','entregado'),
    )
    cliente = models.ForeignKey(User,on_delete=models.SET_NULL, null=True, blank=True, related_name='ordenes',limit_choices_to={'user_type': 'cliente'})
    fecha_pedido = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=30, choices=STATE, default='solicitado')
    direccion = models.CharField(max_length=50)

    def __str__(self):
        return self.cliente
