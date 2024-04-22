from rest_framework import generics, permissions, status
from rest_framework.response import Response

from apps.cart.models import Cart
from apps.cart.api.serializers import CartSerializer, CartDetailSerializer


class CartListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CartSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Cart.objects.filter(user=user)
        else:
            return Cart.objects.none()


class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CartDetailSerializer
    queryset = Cart.objects.all()
