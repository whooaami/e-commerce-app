from rest_framework import generics, permissions

from apps.api.pagination import ProjectPagination
from apps.abstract.views import AbstractListCreateView
from apps.order.models import Order
from apps.order.api.serializers import OrderSerializer, OrderDetailSerializer


class OrderListView(AbstractListCreateView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = OrderSerializer
    pagination_class = ProjectPagination
    queryset = Order.objects.all()


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()
