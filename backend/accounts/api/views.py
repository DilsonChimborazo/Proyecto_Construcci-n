from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from accounts.models import User
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LoginSerializer

# Vista de login
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

# Vista para registrar usuarios
class RegisterViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post"]
