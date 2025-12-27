from rest_framework.serializers import ModelSerializer 
from accounts.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Serializador de login
class LoginSerializer(TokenObtainPairSerializer):
    username_field = "email"


# serialiardor para registrar usuarios (cliente o empresa)
class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'cedula_nit',
            'email',
            'full_name',
            'phone',
            'user_type',
            'photo',
            'password'
        )
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password) 
        user.is_active = True
        user.save()
        return user
