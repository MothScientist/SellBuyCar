# from django.shortcuts import render
from rest_framework import generics, status
from .serializers import CarSerializer
from .models import Cars
from rest_framework.views import APIView
from rest_framework.response import Response


class CarView(generics.CreateAPIView):
    queryset = Cars.objects.all()
    serializer_class = CarSerializer


class GetCar(APIView):
    serializer_class = CarSerializer

    @staticmethod  # The decorator shows that we are not using class objects as function parameters.
    def get(request):  # if you remove 'request', then everything will break :(
        cars = Cars.objects.all()

        if cars:
            data = CarSerializer(cars, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad request': 'Data not found'}, status=status.HTTP_404_NOT_FOUND)


# Получение объектов: https://metanit.com/python/django/5.12.php
