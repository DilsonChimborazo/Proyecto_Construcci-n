from rest_framework import serializers
from Order.models import Order
from accounts.api.serializers import UserSerializer

class OrderSerializer(serializers.ModelSerializer):
    cliente = UserSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ('cliente',)

    def validate(self, attrs):
        request = self.context.get('request')

        if request and request.method in ['POST', 'PUT', 'PATCH']:
            if request.user.user_type != 'cliente':
                raise serializers.ValidationError(
                    'Solo clientes pueden crear o modificar pedidos'
                )
        return attrs
