from apps.abstract.serializers import AbstractSerializer
from apps.product.api.serializers import ProductSerializer
from apps.cart.models import Cart


class CartSerializer(AbstractSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = [
            "id",
            "user",
            "products",
            "created_date",
            "updated_date",
        ]
