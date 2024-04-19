from rest_framework import serializers

from apps.product.models import Product, Category
from apps.wishlist.models import Wishlist


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), required=False
    )

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
        category_pk = self.context.get("view").kwargs.get("category_pk")
        try:
            category = Category.objects.get(pk=category_pk)
        except Category.DoesNotExist:
            raise serializers.ValidationError("Category matching query does not exist.")

        product = Product.objects.create(category=category, **validated_data)
        return product
