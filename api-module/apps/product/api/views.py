from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions

from apps.product.models import Product, Category
from apps.product.api.serializers import ProductSerializer, CategorySerializer


class CategoryListView(generics.ListCreateAPIView):
    """
    Browse to get a list of all product categories or create a new category.
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    View to get, update, or delete information about a product category.
    """

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ProductListView(generics.ListCreateAPIView):
    """
    View to get a list of all products or create a new product.
    """

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        """
        Returns a list of all products that match the filter by category.
        """
        category_pk = self.kwargs.get("category_pk")
        category = get_object_or_404(Category, pk=category_pk)
        return Product.objects.filter(category=category)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    View to get, update, or delete product information.
    """

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
