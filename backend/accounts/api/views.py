from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from accounts.models import User
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LoginSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.views import APIView

# Vista de login
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

# Vista para registrar usuarios
class RegisterViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post","get","patch"]

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class EmpresasView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        empresas = User.objects.filter(user_type='empresa')
        serializer = UserSerializer(empresas, many=True)
        return Response(serializer.data)