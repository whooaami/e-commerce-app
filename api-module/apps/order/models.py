from django.db import models

from apps.abstract.models import AbstractModel
from apps.order.managers import OrderManager


class Order(AbstractModel):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Processing", "Processing"),
        ("Shipped", "Shipped"),
        ("Delivered", "Delivered"),
        ("Cancelled", "Cancelled"),
    ]

    user = models.ForeignKey(to="user.User", on_delete=models.CASCADE)
    products = models.ManyToManyField(to="product.Product", through="OrderItem")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    shipping_address = models.TextField()

    objects = OrderManager()

    def __str__(self):
        return f"Order #{self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(to="product.Product", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product} (Quantity: {self.quantity})"
