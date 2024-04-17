from django.urls import path

from apps.authentication.api.views import (
    UserRegisterView,
    UserLoginView,
    TokenRefreshView,
)


urlpatterns = [
    # /api/auth/...
    path("register/", UserRegisterView.as_view()),
    path("login/", UserLoginView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
]
