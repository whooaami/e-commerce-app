from django.urls import path

from apps.product.api.views import (
    CategoryListView,
    CategoryDetailView,
    ProductListView,
    ProductDetailView,
)


urlpatterns = [
    # /api/category/...
    path("", CategoryListView.as_view(), name="api_categories_list"),
    path("<int:pk>/", CategoryDetailView.as_view(), name="api_category_detail"),
    path(
        "<int:category_pk>/products/",
        ProductListView.as_view(),
        name="api_products_list",
    ),
    path(
        "<int:category_pk>/products/<int:pk>/",
        ProductDetailView.as_view(),
        name="api_product_detail",
    ),
]
