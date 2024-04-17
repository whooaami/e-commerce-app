from rest_framework import generics, permissions

from apps.api.pagination import ProjectPagination
from apps.abstract.views import AbstractListCreateView
from apps.product.models import Product
from apps.wishlist.models import Wishlist
from apps.product.api.serializers import ProductSerializer


class ProductListView(AbstractListCreateView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProductSerializer
    pagination_class = ProjectPagination
    queryset = Product.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.user.is_authenticated:
            saved_products_pk = Wishlist.objects.filter(
                user=self.request.user
            ).values_list("product_id", flat=True)
            context.update({"saved_products_pk": saved_products_pk})
        return context


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProductSerializer
    pagination_class = ProjectPagination
    queryset = Product.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.user.is_authenticated:
            saved_products_pk = Wishlist.objects.filter(
                user=self.request.user
            ).values_list("product_id", flat=True)
            context.update({"saved_products_pk": saved_products_pk})
        return context
