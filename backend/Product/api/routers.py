from rest_framework.routers import DefaultRouter
from Product.api.views import ProductViewSet

routerProduct = DefaultRouter()
routerProduct.register("productos", ProductViewSet, basename="productos")