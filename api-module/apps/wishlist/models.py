from django.db import models

from apps.abstract.models import AbstractModel


class Wishlist(AbstractModel):
    user = models.ForeignKey(to='user.User', on_delete=models.CASCADE, related_name='wishlists_items')
    products = models.ForeignKey(to='product.Product', on_delete=models.CASCADE, related_name='wishlists')

    def __str__(self):
        return f'Wishlist of {self.user.username}'
