from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView 
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.serializers.user_serializers import UserSerializer, UserSerializerWithToken, MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    throttle_scope = 'app_scope'

class UserRegister(APIView):
    throttle_scope = 'app_scope'
    def post(self, request):
        
        data =  request.data
        try:
            user = User.objects.create(
                first_name=data['name'],
                username=data['email'],
                email=data['email'],
                password=make_password(data['password'])
            )
            serializer = UserSerializerWithToken(user, many=False)
            return Response(serializer.data)
        except:
            message = { 'detail': 'User with this email already exists' }
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


