from rest_framework import serializers

from apps.abstract.serializers import AbstractSerializer
from apps.cart.models import Cart


class CartSerializer(AbstractSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "user", "products", "created_date", "updated_date"]
