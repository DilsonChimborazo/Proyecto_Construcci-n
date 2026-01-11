from rest_framework.viewsets import ModelViewSet
from detailOrder.models import DetailOrder
from .serializers import DetailOrderSerializer

class DetailOrderViewSet(ModelViewSet):
    queryset = DetailOrder.objects.select_related('pedido', 'producto')
    serializer_class = DetailOrderSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        pedido_id = self.request.query_params.get('pedido')
        if pedido_id:
            queryset = queryset.filter(pedido_id=pedido_id)
        return queryset
