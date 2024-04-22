from django.urls import path

from apps.wishlist.api.views import SavedProductsList, SavedProductsDestroy


urlpatterns = [
    # /api/saved-list/...
    path(
        "",
        SavedProductsList.as_view(),
        name="saved_companies_create",
    ),
    path(
        "<int:pk>/",
        SavedProductsDestroy.as_view(),
        name="saved_companies_destroy",
    ),
]
