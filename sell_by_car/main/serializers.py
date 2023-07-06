from rest_framework import serializers
from .models import Cars


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cars
        fields = ('id', 'brand', 'model', 'year', 'mileage', 'price', 'warranty', 'weight', 'accident', 'car_owners',
                  'to_100', 'engine', 'power', 'torque')
