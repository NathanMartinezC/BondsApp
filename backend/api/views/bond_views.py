from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from bonds.models import Bond
from django.contrib.auth.models import User
from api.serializers.bond_serializers import BondSerializer, DollarSerializer
from api.serializers.user_serializers import UserSerializer
from api.services import get_dollar_value
from decimal import Decimal


class BondsToSellList(generics.ListAPIView):
    queryset = Bond.objects.all()
    serializer_class = BondSerializer
    permission_classes = [IsAuthenticated]
    throttle_scope = 'app_scope'

    def get(self, request):
        try:
            user = request.user
            queryset = self.get_queryset().filter(Q(seller=user) | Q(buyer=user)).order_by('buyer')
            serializer = BondSerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            message = { 'detail': 'Your bonds cannot be displayed' }
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class BondsToBuyList(generics.ListAPIView):
    queryset = Bond.objects.all()
    serializer_class = BondSerializer
    permission_classes = [IsAuthenticated]
    throttle_scope = 'app_scope'

    def get(self, request):
        try:
            user = request.user
            queryset = self.get_queryset().exclude(seller=user).filter(buyer__isnull=True)
            serializer = BondSerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            message = { 'detail': 'The bonds cannot be displayed' }
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class BondBuyUpdate(generics.UpdateAPIView):
    queryset = Bond.objects.all()
    serializer_class = BondSerializer
    permission_classes = [IsAuthenticated]
    throttle_scope = 'app_scope'

    def update(self, request, *args, **kwargs):
        user = request.user
        try:
            bond = Bond.objects.get(id=kwargs['pk'])
            bond.buyer = user
            bond.save()
            message = { 'detail': 'The bond has been bought' }
            return Response(message, status=status.HTTP_200_OK)
        except:
            message = { 'detail': 'Bond could not be bought' }
            return Response(message, status=status.HTTP_400_BAD_REQUEST)



class BondCreate(generics.CreateAPIView):
    serializer_class = BondSerializer
    permission_classes = [IsAuthenticated]
    throttle_scope = 'app_scope'

    def post(self, request):
        user = request.user
        data = request.data
        serializer = self.serializer_class(data=data, many=False)
        if serializer.is_valid():
            serializer.save(seller=user)
            message = { 'detail': 'The bond has been create' }
            return Response(message, status=status.HTTP_201_CREATED)
        else:
            message = { 'detail': 'The bond could not be created. Verify your input values' }
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        

class BondDollarValue(APIView):
    permission_classes = [IsAuthenticated]
    throttle_scope = 'app_scope'

    def get(self, request):
        try:
            data = get_dollar_value()
            serializer = DollarSerializer({
                'value': data['dato'],
                'date': data['fecha']
            }, many=False)
            return Response(serializer.data)
        except:
            message = { 'detail': 'Money conversion could not be done. Try it later' }
            return Response(message, status=status.HTTP_400_BAD_REQUEST)










