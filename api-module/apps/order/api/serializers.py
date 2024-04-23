from rest_framework import serializers

from apps.order.models import Order, OrderItem
from apps.product.models import Product


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.CharField()

    class Meta:
        model = Product
        fields = ["id", "name", "price", "description", "image"]


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ["product", "quantity"]

    def create(self, validated_data):
        product_data = validated_data.pop("product", None)
        product, _ = Product.objects.get_or_create(**product_data)
        order_item = OrderItem.objects.create(product=product, **validated_data)
        return order_item


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "user", "status", "shipping_address", "order_items"]

    def create(self, validated_data):
        order_items_data = validated_data.pop("order_items")
        order = Order.objects.create(**validated_data)
        for order_item_data in order_items_data:
            product_data = order_item_data.pop("product", None)
            product, _ = Product.objects.get_or_create(**product_data)
            OrderItem.objects.create(order=order, product=product, **order_item_data)
        return order
