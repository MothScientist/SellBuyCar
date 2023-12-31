# from django.shortcuts import render
from rest_framework import generics, status
from .serializers import CarSerializer, UserSerializer, EmailSerializer
from .models import Cars, ExtraUser
from rest_framework.views import APIView
from rest_framework.response import Response


class CarView(generics.CreateAPIView):
    queryset = Cars.objects.all()
    serializer_class = CarSerializer


class GetCar(APIView):
    serializer_class = CarSerializer

    @staticmethod  # The decorator shows that we are not using class objects as function parameters.
    def get(self, request):  # if you remove 'request', then everything will break :(
        cars = Cars.objects.all()

        if cars:
            data = CarSerializer(cars, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad request': 'Data not found'}, status=status.HTTP_404_NOT_FOUND)


class AddUser(APIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            email = serializer.data.get('email')
            phone_number = serializer.data.get('phone_number')
            DOB = serializer.data.get('DOB')
            queryset = ExtraUser.objects.filter(email=email)
            if queryset.exists():
                return Response({'Bad Request': 'idk'}, status=status.HTTP_402_PAYMENT_REQUIRED)
            user = ExtraUser(first_name=first_name, last_name=last_name, email=email, phone_number=phone_number, DOB=DOB)
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        print(serializer.error_messages)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class GetEmail(APIView):
    serializer_class = EmailSerializer

    @staticmethod
    def find_email(self, request, email_to_find):
        email = ExtraUser.objects.get(email=email_to_find)

        if email:
            return Response({'OK': 'Email exists'}, status=status.HTTP_200_OK)

        return Response({'Bad request': 'Email does not exist'}, status=status.HTTP_404_NOT_FOUND)


# Получение объектов: https://metanit.com/python/django/5.12.php
