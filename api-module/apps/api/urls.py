from django.urls import path, include


urlpatterns = [
    # /api/...
    path("auth/", include("apps.authentication.api.urls")),
    path("users/", include("apps.user.api.urls")),
    path("orders/", include("apps.order.api.urls")),
    path("products/", include("apps.product.api.urls")),
    path("saved-list/", include("apps.wishlist.api.urls")),
    path("cart/", include("apps.cart.api.urls")),
]
