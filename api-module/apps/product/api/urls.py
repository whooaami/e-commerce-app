from django.urls import path

from apps.product.api.views import ProductListView, ProductDetailView


urlpatterns = [
    # /api/products/...
    path("", ProductListView.as_view(), name="api_products_list"),
    path("<pk>/", ProductDetailView.as_view(), name="api_product_detail"),
]
