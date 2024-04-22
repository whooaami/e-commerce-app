from rest_framework import serializers

from apps.product.models import Product
from apps.cart.models import Cart


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "image", "quantity"]


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


class CartDetailSerializer(serializers.ModelSerializer):
    product_info = ProductSerializer(source="product", read_only=True)
    quantity = serializers.IntegerField(write_only=True)

    class Meta:
        model = Cart
        fields = [
            "id",
            "user",
            "product",
            "product_info",
            "quantity",
            "created_date",
            "updated_date",
        ]

    def update(self, instance, validated_data):
        quantity = validated_data.pop("quantity", None)
        product = instance.product

        if quantity is not None:
            product.quantity = quantity
            product.save()

        return super().update(instance, validated_data)
