from rest_framework import serializers

from apps.abstract.serializers import AbstractSerializer
from apps.cart.models import Cart

class CartSerializer(serializers.ModelSerializer, AbstractSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = [
            "user",
            "products",
        ]
