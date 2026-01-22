from django.db import models
from accounts.models import User
from decimal import Decimal

class Order(models.Model):
    STATE = (
        ('solicitado', 'solicitado'),
        ('en proceso', 'en proceso'),
        ('en camino', 'en camino'),
        ('entregado', 'entregado'),
    )

    cliente = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='ordenes',
        limit_choices_to={'user_type': 'cliente'}
    )

    fecha_venta = models.DateField(auto_now_add=True)
    fecha_pedido = models.DateField(null=True, blank=True)
    estado = models.CharField(max_length=30, choices=STATE, default='solicitado')
    direccion = models.CharField(max_length=50)

    def __str__(self):
        return f"Pedido #{self.id}"

    # Subtotal del pedido (suma de detalles)
    @property
    def subtotal(self):
        return sum(
            (d.subtotal for d in self.detalles.all()),
            Decimal('0.00')
        )

    @property
    def total(self):
        return sum(
            (d.total for d in self.detalles.all()),
            Decimal('0.00')
        )
