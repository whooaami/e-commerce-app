from rest_framework import serializers

from apps.product.models import Product, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "image"]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            # "image",
            "quantity",
            "category",
            "created_date",
            "updated_date",
        ]
        read_only_fields = ["quantity", "category"]
