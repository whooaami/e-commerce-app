from apps.abstract.serializers import AbstractSerializer
from apps.user.models import User


class UserSerializer(AbstractSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'is_active',
            'created_date',
            'updated_date'
            ]
        read_only_field = ['is_active']


class UserDetailSerializer(AbstractSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'bio',
            'avatar',
            'email',
            'is_active',
            'created_date',
            'updated_date'
            ]
        read_only_field = ['is_active']
