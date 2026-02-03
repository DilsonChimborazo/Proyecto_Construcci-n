from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from calificacion.models import Calificacion
from .serializers import CalificacionSerializer

class CalificacionViewSet(ModelViewSet):
    queryset = Calificacion.objects.all()
    serializer_class = CalificacionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
