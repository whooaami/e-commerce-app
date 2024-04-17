from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from apps.abstract.models import AbstractModel
from apps.user.managers import UserManager


class User(AbstractModel, AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True, unique=True)
    bio = models.TextField(null=True)
    avatar = models.ImageField(null=True)

    wishlist = models.ManyToManyField(to="wishlist.Wishlist", related_name="users")

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    is_admin = models.BooleanField(default=False)
    is_moderator = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    def __str__(self):
        return f"{self.email}"

    @property
    def is_privileged(self):
        return self.is_moderator or self.is_admin

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    def add_to_wishlist(self, product):
        """Like `product` if it hasn't been done yet"""
        return self.wishlist.add(product)

    def remove_from_wishlist(self, product):
        """Remove a like from a `product`"""
        return self.wishlist.remove(product)

    def has_added_to_wishlist(self, product):
        """Return True if the user has liked a `product`; else False"""
        return self.wishlist.filter(pk=product.pk).exists()
