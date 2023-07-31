from django.urls import path
from .views import CarView, GetCar, AddUser

urlpatterns = [
    path('', CarView.as_view()),
    path('get_cars', GetCar.as_view()),
    path('add_user', AddUser.as_view())
]
