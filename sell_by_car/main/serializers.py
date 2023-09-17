from rest_framework import serializers
from .models import Cars, ExtraUser


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cars
        fields = ('id', 'brand', 'model', 'year', 'mileage', 'price', 'warranty', 'weight', 'accident', 'car_owners',
                  'to_100', 'engine', 'power', 'torque')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraUser
        fields = ('first_name', 'last_name', 'email', 'phone_number', 'DOB')


class EmailSerializer(serializers.Serializer):
    class Meta:
        model = ExtraUser
        fields = 'email'
