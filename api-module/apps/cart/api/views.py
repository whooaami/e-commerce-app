from rest_framework import generics, permissions

from apps.api.pagination import ProjectPagination
from apps.cart.models import Cart
from apps.cart.api.serializers import CartSerializer


class CartListView(generics.ListCreateAPIView):
    """
    List all carts or create a new cart.
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = CartSerializer
    pagination_class = ProjectPagination

    def get_queryset(self):
        """
        Optionally restricts the carts to a given user,
        by filtering against query parameter in the URL.
        """
        queryset = Cart.objects.all()
        user_id = self.request.query_params.get("user_id", None)
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        return queryset


class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a cart instance.
    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = CartSerializer
    pagination_class = ProjectPagination
    queryset = Cart.objects.all()
