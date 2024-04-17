from django.db import models

from apps.abstract.managers import AbstractManager


class AbstractModel(models.Model):
    id = models.AutoField(primary_key=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    objects = AbstractManager()

    class Meta:
        abstract = True
