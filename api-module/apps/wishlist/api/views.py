from rest_framework import permissions, generics, status
from rest_framework.response import Response

from apps.product.models import Product
from apps.wishlist.models import Wishlist
from apps.wishlist.api.serializers import WishlistSerializer


class SavedProductsList(generics.ListCreateAPIView):
    """
    List of saved products.
    Add a product to the saved list.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WishlistSerializer

    def get_queryset(self):
        user = self.request.user
        return Wishlist.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        product_id = request.data.get("products")

        if not product_id:
            return Response(
                {"error": "Product ID must be provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        product = Product.objects.filter(id=product_id).first()
        if not product:
            return Response(
                {"error": "Product with provided ID does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if Wishlist.objects.filter(user=user, products=product).exists():
            return Response(
                {"message": "Product already saved."},
                status=status.HTTP_200_OK,
            )

        wishlist_item = Wishlist.objects.create(user=user, products=product)
        serializer = WishlistSerializer(wishlist_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SavedProductsDestroy(generics.DestroyAPIView):
    """
    Remove the product from the saved list.
    """

    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        user = request.user
        product_id = kwargs.get("product_id")

        if not product_id:
            return Response(
                {"error": "Product ID must be provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        product = Product.objects.filter(id=product_id).first()
        if not product:
            return Response(
                {"error": "Product with provided ID does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        wishlist_item = Wishlist.objects.filter(user=user, product=product).first()
        if not wishlist_item:
            return Response(
                {"error": "Product not found in the saved list."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        wishlist_item.delete()
        return Response(
            {"message": "Product removed from the saved list."},
            status=status.HTTP_204_NO_CONTENT,
        )
