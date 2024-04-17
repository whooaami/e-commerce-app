from django.urls import path

from apps.cart.api.views import CartListView, CartDetailView


urlpatterns = [
    # /api/cart/...
    path("", CartListView.as_view(), name="api_cart_list"),
    path("<pk>/", CartDetailView.as_view(), name="api_cart_detail"),
]
