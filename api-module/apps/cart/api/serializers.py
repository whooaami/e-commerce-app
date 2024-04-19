from rest_framework import serializers

from apps.product.models import Product
from apps.cart.models import Cart


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "description", "price"]


class CartSerializer(serializers.ModelSerializer):
    product_info = ProductSerializer(source="product", read_only=True)

    class Meta:
        model = Cart
        fields = [
            "id",
            "user",
            "product",
            "product_info",
            "created_date",
            "updated_date",
        ]
