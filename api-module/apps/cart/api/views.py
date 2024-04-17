from rest_framework import generics, permissions

from apps.api.pagination import ProjectPagination
from apps.abstract.views import AbstractListCreateView
from apps.cart.models import Cart
from apps.cart.api.serializers import (
    CartSerializer,
)


class CartListView(AbstractListCreateView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CartSerializer
    pagination_class = ProjectPagination
    queryset = Cart.objects.all()


class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CartSerializer
    pagination_class = ProjectPagination
    queryset = Cart.objects.all()
