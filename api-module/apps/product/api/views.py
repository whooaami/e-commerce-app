from rest_framework import (
    generics,
    permissions
)

from apps.api.pagination import ProjectPagination
from apps.abstract.views import AbstractListCreateView
from apps.product.models import Product
from apps.product.api.serializers import ProductSerializer


class ProductListView(AbstractListCreateView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProductSerializer
    pagination_class = ProjectPagination
    queryset = Product.objects.all()
  

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProductSerializer
    pagination_class = ProjectPagination
    queryset = Product.objects.all()
