from rest_framework import serializers

from apps.order.models import Order, OrderItem
from apps.product.api.serializers import ProductSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    products = OrderItemSerializer(source='orderitem_set', many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "products",
            "status",
            "shipping_address",
            "created_date",
            "updated_date",
        ]

    def create(self, validated_data):
        products_data = validated_data.pop('orderitem_set')
        order = Order.objects.create(**validated_data)
        for product_data in products_data:
            OrderItem.objects.create(order=order, **product_data)
        return order
