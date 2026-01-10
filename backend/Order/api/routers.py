from rest_framework.routers import DefaultRouter
from Order.api.views import OrderViewSet

routerOrder = DefaultRouter()
routerOrder.register("pedidos", OrderViewSet, basename="pedidos")