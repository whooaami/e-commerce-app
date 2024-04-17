from django.shortcuts import get_object_or_404
from rest_framework import permissions, generics, status
from rest_framework.response import Response

from apps.api.pagination import ProjectPagination
from apps.product.models import Product
from apps.wishlist.models import Wishlist
from apps.wishlist.api.serializers import WishlistSerializer


class SavedCompaniesCreate(generics.ListCreateAPIView):
    """
    List of saved products.
    Add a company to the saved list.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WishlistSerializer
    pagination_class = ProjectPagination
    queryset = Wishlist.objects.all()

    def post(self, request, *args, **kwargs):
        user = request.user
        product_ids = request.data.get("products", [])

        if not product_ids:
            return Response(
                {"error": "At least one product ID must be provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if isinstance(product_ids, int):
            product_ids = [product_ids]

        for product_id in product_ids:
            product = get_object_or_404(Product, id=product_id)

            saved_product = Wishlist.objects.filter(user=user, products=product).first()
            if saved_product:
                return Response(
                    {"message": f"Product {product.name} already saved."},
                    status=status.HTTP_200_OK,
                )

            wishlist = Wishlist.objects.create(user=user, products=product)

        return Response({"message": "Products saved."}, status=status.HTTP_201_CREATED)


class SavedCompaniesDestroy(generics.DestroyAPIView):
    """
    Remove the product from the saved list.
    """

    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        user = request.user

        product_ids = request.data.get("products", [])

        if not product_ids:
            return Response(
                {"error": "At least one product ID must be provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if isinstance(product_ids, int):
            product_ids = [product_ids]

        for product_id in product_ids:
            saved_product = get_object_or_404(
                Wishlist, products__id=product_id, user=user
            )
            saved_product.delete()

        return Response(
            f"Products {product_ids} deleted from saved list",
            status=status.HTTP_204_NO_CONTENT,
        )
