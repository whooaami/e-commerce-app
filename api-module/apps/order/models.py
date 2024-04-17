from django.db import models

from apps.abstract.models import AbstractModel
from apps.order.managers import OrderManager


class Order(AbstractModel):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    products = models.ManyToManyField(to='product.Product')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    shipping_address = models.TextField()

    objects = OrderManager()

    def __str__(self):
        return f'Order #{self.id}'
