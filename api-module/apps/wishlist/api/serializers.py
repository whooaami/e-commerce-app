from rest_framework import serializers

from apps.product.models import Product
from apps.product.api.serializers import ProductSerializer
from apps.wishlist.models import Wishlist


class WishlistSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Wishlist
        fields = ["id", "user", "products", "created_date", "updated_date"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        product_data = ProductSerializer(instance.products).data
        representation['products'] = product_data
        return representation
