from rest_framework.routers import DefaultRouter
from calificacion.api.views import CalificacionViewSet

routercalificacion = DefaultRouter()
routercalificacion.register("calificaciones", CalificacionViewSet, basename="calificaciones")