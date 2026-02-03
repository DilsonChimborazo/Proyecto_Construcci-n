from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from Product.models import Product
from .serializers import ProductSerializer
from .permissions import IsEmpresaOrReadOnly

class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
        IsEmpresaOrReadOnly
    ]
    http_method_names = ["get", "post", "patch"]

    def get_queryset(self):
        user = self.request.user

        # Empresa ve solo sus productos
        if user.is_authenticated and user.user_type == 'empresa':
            return Product.objects.filter(empresa=user)

        # Clientes ven todos los productos
        return Product.objects.all()

    def perform_create(self, serializer):
        serializer.save(empresa=self.request.user)
    
    def create(self, request, *args, **kwargs):
        print('DATA:', request.data)
        print('FILES:', request.FILES)
        return super().create(request, *args, **kwargs)

