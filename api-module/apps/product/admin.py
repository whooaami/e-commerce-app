from django.contrib import admin
from django.utils.safestring import mark_safe

from apps.product.models import Category, Product


class ImagePreviewMixin:
    def image_preview(self, obj, width=50, height=50):
        if obj.image:
            return mark_safe('<img src="{url}" width="{width}" height="{height}" />'.format(
                url=obj.image.url,
                width=width,
                height=height,
            ))
        else:
            return '(No image)'

    image_preview.short_description = 'Image Preview'


class CategoryAdmin(admin.ModelAdmin, ImagePreviewMixin):
    list_display = ['name', 'image_preview']
    readonly_fields = ('image_preview',)


class ProductAdmin(admin.ModelAdmin, ImagePreviewMixin):
    list_display = ['name', 'description', 'price', 'quantity', 'category', 'image_preview']
    readonly_fields = ('image_preview',)


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
