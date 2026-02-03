"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from accounts.api.routers import routerRegister
from accounts.api.views import EmpresasView
from accounts.api.views import LoginView, MeView
from Product.api.routers import routerProduct
from Order.api.routers import routerOrder
from detailOrder.api.routers import routerDetailOrder

# Vistas ya creadas por simpleJWT
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    
    path("api/login/", LoginView.as_view(), name="login"),
    path('api/me/', MeView.as_view(), name='me'),
    path("api/", include(routerRegister.urls)),
    path("api/empresas/", EmpresasView.as_view(), name="empresas"),
    path("api/", include(routerProduct.urls)),
    path("api/", include(routerOrder.urls)),
    path("api/", include(routerDetailOrder.urls)),

]

#Esto permite ver las imagenes en el navegador
urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)