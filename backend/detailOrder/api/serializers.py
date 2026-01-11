from rest_framework import serializers
from detailOrder.models import DetailOrder
from Order.models import Order
from Product.models import Product
from Product.api.serializers import ProductSerializer
from Order.api.serializers import OrderSerializer

class DetailOrderSerializer(serializers.ModelSerializer):
    producto = ProductSerializer(read_only=True)
    pedido = OrderSerializer(read_only=True)

    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='producto',
        write_only=True
    )

    pedido_id = serializers.PrimaryKeyRelatedField(
        queryset=Order.objects.all(),
        source='pedido',
        write_only=True
    )

    subtotal = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = DetailOrder
        fields = [
            'id',
            'pedido',
            'pedido_id',
            'producto',
            'producto_id',
            'cantidad',
            'subtotal',
            'total',
        ]
