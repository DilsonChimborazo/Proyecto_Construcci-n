from .views import RegisterViewSet
from rest_framework.routers import DefaultRouter

routerRegister = DefaultRouter()
routerRegister.register("register", RegisterViewSet, basename="register")


