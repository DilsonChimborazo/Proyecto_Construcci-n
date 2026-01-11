from rest_framework.routers import DefaultRouter
from detailOrder.api.views import DetailOrderViewSet

routerDetailOrder = DefaultRouter()
routerDetailOrder.register("detalles", DetailOrderViewSet, basename="detalles")