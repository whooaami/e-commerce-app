from apps.abstract.serializers import AbstractSerializer
from apps.wishlist.models import Wishlist


class WishlistSerializer(AbstractSerializer):

    class Meta:
        model = Wishlist
        fields = ["id", "user", "products", "created_date", "updated_date"]
