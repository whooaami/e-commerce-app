from django.shortcuts import get_object_or_404
from rest_framework import generics

from apps.api.pagination import ProjectPagination
from apps.abstract.views import AbstractListCreateView
from apps.user.models import User
from apps.user.api.serializers import UserSerializer, UserDetailSerializer


class UsersListView(AbstractListCreateView):
    """
    List of users.
    """

    queryset = User.objects.filter(is_superuser=False).order_by("id")
    serializer_class = UserSerializer
    pagination_class = ProjectPagination


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a user by ID.
    """

    serializer_class = UserDetailSerializer
    pagination_class = ProjectPagination

    def get_object(self):
        id = self.kwargs.get("id")
        queryset = User.objects.filter(is_superuser=False)
        user = get_object_or_404(queryset, id=id)
        return user
