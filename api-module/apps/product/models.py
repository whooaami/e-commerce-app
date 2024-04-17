from django.db import models

from apps.abstract.models import AbstractModel
from apps.product.managers import ProductManager


class Product(AbstractModel):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # image = models.ImageField(null=True, blank=True, upload_to='products/')
    quantity = models.IntegerField(default=0)

    objects = ProductManager()

    def __str__(self):
        return self.name
