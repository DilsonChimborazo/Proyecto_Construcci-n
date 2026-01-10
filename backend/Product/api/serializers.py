from rest_framework import serializers
from Product.models import Product
from accounts.api.serializers import UserSerializer

class ProductSerializer(serializers.ModelSerializer):
    empresa = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('empresa',)

    def validate(self, attrs):
        request = self.context.get('request')

        if request and request.method in ['POST', 'PUT', 'PATCH']:
            if request.user.user_type != 'empresa':
                raise serializers.ValidationError(
                    'Solo empresas pueden crear o modificar productos'
                )
        return attrs
