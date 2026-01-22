from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from detailOrder.models import DetailOrder
from .serializers import DetailOrderSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from django.db.models.functions import TruncMonth

class DetailOrderViewSet(ModelViewSet):
    serializer_class = DetailOrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        queryset = DetailOrder.objects.select_related(
            'pedido',
            'producto',
            'pedido__cliente',
            'producto__empresa'
        )

        # FILTRO OPCIONAL POR PEDIDO
        pedido_id = self.request.query_params.get('pedido')
        if pedido_id:
            queryset = queryset.filter(pedido_id=pedido_id)

        # EMPRESA: ve pedidos hechos a su empresa
        if user.user_type == 'empresa':
            queryset = queryset.filter(producto__empresa=user)

        # CLIENTE: ve solo los pedidos que él hizo
        elif user.user_type == 'cliente':
            queryset = queryset.filter(pedido__cliente=user)

        return queryset
    @action(detail=False, methods=['get'], url_path='ventas-por-producto/(?P<product_id>[^/.]+)')
    def ventas_por_producto(self, request, product_id=None):
        user = request.user

        if user.user_type != 'empresa':
            return Response(
                {'detail': 'No autorizado'},
                status=403
            )

        queryset = DetailOrder.objects.filter(
            producto_id=product_id,
            producto__empresa=user
        )

        ventas = (
            queryset
            .annotate(mes=TruncMonth('pedido__fecha_venta'))
            .values('mes')
            .annotate(total_vendido=Sum('cantidad'))
            .order_by('mes')
        )

        data = [
            {
                'mes': v['mes'].strftime('%Y-%m'),
                'total': v['total_vendido']
            }
            for v in ventas
        ]

        return Response(data)
