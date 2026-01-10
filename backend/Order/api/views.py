from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from Order.models import Order
from .serializers import OrderSerializer
from .permissions import IsClientOrReadOnly

class OrderViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
        IsClientOrReadOnly
    ]
    http_method_names = ["get", "post", "patch"]

    def get_queryset(self):
        user = self.request.user

        # Clientes miran los pedidos
        if user.is_authenticated and user.user_type == 'cliente':
            return Order.objects.filter(cliente=user)

        # Empresa miran todos los pedidos
        return Order.objects.all()

    def perform_create(self, serializer):
        serializer.save(cliente=self.request.user)
