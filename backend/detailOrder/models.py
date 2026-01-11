from django.db import models
from django.core.exceptions import ValidationError
from Order.models import Order
from Product.models import Product
from decimal import Decimal

class DetailOrder(models.Model):
    pedido = models.ForeignKey(
        Order,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='detalles'
    )

    producto = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True
    )

    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        if not self.producto:
            raise ValidationError("Debe seleccionar un producto")

        if self.cantidad <= 0:
            raise ValidationError("La cantidad debe ser mayor a 0")

        # 🔹 Validar stock
        if self.producto.stock < self.cantidad:
            raise ValidationError("Stock insuficiente")

        # 🔹 Calcular subtotal
        self.subtotal = self.producto.precio * self.cantidad

        iva = self.subtotal * (self.producto.iva / Decimal('100'))
        descuento = self.subtotal * (self.producto.descuento / Decimal('100'))

        self.total = self.subtotal + iva - descuento

        # 🔹 Descontar stock
        self.producto.stock -= int(self.cantidad)
        self.producto.save()

        super().save(*args, **kwargs)


    def __str__(self):
        return f"{self.producto} x {self.cantidad}"
