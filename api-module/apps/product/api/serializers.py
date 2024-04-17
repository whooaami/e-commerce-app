from apps.abstract.serializers import AbstractSerializer
from apps.product.models import Product


class ProductSerializer(AbstractSerializer):

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            # 'image',
            "quantity",
            "created_date",
            "updated_date",
        ]
        read_only_fields = ["quantity"]
