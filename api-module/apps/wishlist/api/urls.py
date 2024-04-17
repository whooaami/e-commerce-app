from django.urls import path

from apps.wishlist.api.views import SavedCompaniesCreate, SavedCompaniesDestroy


urlpatterns = [
    # /api/saved-list/...
    path(
        "",
        SavedCompaniesCreate.as_view(),
        name="saved_companies_create",
    ),
    path(
        "<pk>/",
        SavedCompaniesDestroy.as_view(),
        name="saved_companies_destroy",
    ),
]
