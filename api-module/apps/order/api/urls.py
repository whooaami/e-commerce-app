from django.urls import path

from apps.order.api.views import OrderListView, OrderDetailView


urlpatterns = [
    # /api/orders/...
    path("", OrderListView.as_view(), name="api_orders_list"),
    path("<int:pk>/", OrderDetailView.as_view(), name="api_order_detail"),
]
