from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import SignupSerializer, LoginSerializer
from .services import UserService


@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if not serializer.is_valid():
        first_err = next(iter(serializer.errors.values()))[0]
        return Response({"message": str(first_err)}, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    user = UserService.register_user(
        name=data["name"],
        email=data["email"],
        password=data["password"]
    )
    return Response(
        {"message": "Account created successfully", "email": user.email},
        status=status.HTTP_201_CREATED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

    data = serializer.validated_data
    user, token = UserService.authenticate_user(
        email=data["email"],
        password=data["password"],
        remember_me=data.get("rememberMe", False)
    )

    if not user:
        return Response({"message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({
        "token": token,
        "email": user.email,
        "name": user.first_name or user.username,
        "message": "Login successful"
    })


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response(UserService.serialize_user_payload(request.user))
