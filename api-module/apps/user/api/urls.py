from django.urls import path

from apps.user.api.views import UsersListView, UserDetailView


urlpatterns = [
    # /api/users...
    path("", UsersListView.as_view(), name="api_users_list"),
    path("<int:id>/", UserDetailView.as_view(), name="api_user_detail"),
]
