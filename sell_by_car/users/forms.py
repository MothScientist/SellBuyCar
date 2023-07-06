from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Users


class UsersCreationForm(UserCreationForm):

    class Meta:
        model = Users
        fields = ('birth_date', 'phone_number')


class UsersChangeForm(UserChangeForm):

    class Meta:
        model = Users
        fields = ('birth_date', 'phone_number')
