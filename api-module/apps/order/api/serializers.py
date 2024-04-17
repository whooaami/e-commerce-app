from apps.abstract.serializers import AbstractSerializer
from apps.product.api.serializers import ProductSerializer
from apps.order.models import Order
from apps.product.models import Product


class OrderSerializer(AbstractSerializer):
    products = ProductSerializer(many=True, read_only=True)

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
        products_data = validated_data.pop("products")
        order = Order.objects.create(**validated_data)
        for product_data in products_data:
            Product.objects.create(order=order, **product_data)
        return order
