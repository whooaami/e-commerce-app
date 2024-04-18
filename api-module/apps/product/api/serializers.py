from rest_framework import serializers

from apps.product.models import Product, Category
from apps.wishlist.models import Wishlist


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "quantity",
            "category",
            "created_date",
            "updated_date",
        ]
        read_only_fields = ["quantity", "category"]

    def create(self, validated_data):
        category = validated_data.pop("category")
        product = Product.objects.create(category=category, **validated_data)
        return product

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.context.get("request").user.is_authenticated:
            saved_products_pk = Wishlist.objects.filter(
                user=self.context.get("request").user
            ).values_list("product_id", flat=True)
            context.update({"saved_products_pk": saved_products_pk})
        return context
