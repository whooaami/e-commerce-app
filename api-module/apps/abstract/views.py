from rest_framework import (
    generics,
    filters
)


class AbstractListCreateView(generics.ListCreateAPIView):
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated_date', 'created_date']
    ordering = ['-updated_date']
