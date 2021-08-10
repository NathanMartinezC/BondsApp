from rest_framework import serializers
from bonds.models import Bond
from django.contrib.auth.models import User
from api.serializers.user_serializers import UserSerializer


class BondSerializer(serializers.ModelSerializer):

    seller = UserSerializer(many=False, read_only=True)
    buyer = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Bond
        fields = [
            'id',
            'name',
            'price',
            'number',
            'seller',
            'buyer'
        ]
    
    
class DollarSerializer(serializers.Serializer):
    date = serializers.CharField(max_length=64)
    value = serializers.DecimalField(max_digits=6, decimal_places=4)