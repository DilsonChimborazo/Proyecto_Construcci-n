from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .permissions import IsCliente
from calificacion.models import Calificacion
from .serializers import CalificacionSerializer

class CalificacionViewSet(ModelViewSet):
    queryset = Calificacion.objects.all()
    serializer_class = CalificacionSerializer
    permission_classes = [IsAuthenticated, IsCliente]

    def create(self, request, *args, **kwargs):
        calificacion, created = Calificacion.objects.update_or_create(
            producto_id=request.data['producto'],
            usuario=request.user,
            defaults={'valor': request.data['valor']}
        )
        serializer = self.get_serializer(calificacion)
        return Response(serializer.data)
