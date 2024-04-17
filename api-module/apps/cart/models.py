from django.db import models

from apps.abstract.models import AbstractModel
from apps.cart.managers import CartManager


class Cart(AbstractModel):
    user = models.ForeignKey(to="user.User", on_delete=models.CASCADE)
    products = models.ManyToManyField(to="product.Product")

    objects = CartManager()

    def __str__(self):
        return f"Cart #{self.pk}"
