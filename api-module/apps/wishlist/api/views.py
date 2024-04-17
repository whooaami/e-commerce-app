from django.shortcuts import get_object_or_404
from rest_framework import (
    permissions,
    generics,
    status
)
from rest_framework.response import Response

from apps.api.pagination import ProjectPagination
from apps.wishlist.models import Wishlist
from apps.wishlist.api.serializers import WishlistSerializer


class SavedCompaniesCreate(generics.CreateAPIView):
    """
    List of saved products.
    Add a company to the saved list.
    """

    permission_classes = [permissions.AllowAny]
    serializer_class = WishlistSerializer
    pagination_class = ProjectPagination

    def post(self, request):
        user = request.user
        pk = request.data.get("product_pk")

        # Check if the product is already in the user's saved list
        if WishlistSerializer.objects.filter(user=user, product_pk=pk).exists():
            saved_product_destroyer = SavedCompaniesDestroy()
            return saved_product_destroyer.destroy(request, pk)

        serializer = WishlistSerializer(
            data={"user": user.id, "products": pk}
        )

        if serializer.is_valid():
            serializer.save()
            return Response({"Product added": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SavedCompaniesDestroy(generics.DestroyAPIView):
    """
    Remove the product from the saved list.
    """

    permission_classes = [permissions.AllowAny]

    def destroy(self, request, pk):
        user = request.user
        saved_product = get_object_or_404(
            Wishlist, product_pk=pk, user=user
        )
        saved_product.delete()
        return Response(
            f"Product {pk} deleted", status=status.HTTP_204_NO_CONTENT
        )
