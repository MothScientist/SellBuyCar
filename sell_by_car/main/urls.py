from django.urls import path
from .views import CarView, GetCar, AddUser

urlpatterns = [
    # Потом вместо полной ссылки в href просто ссылаемся на параметр name данной ссылки
    # (p.s. 21:15 https://www.youtube.com/watch?v=OYeqcxaYUbQ&list=PLDyJYA6aTY1nZ9fSGcsK4wqeu-xaJksQQ&index=5)
    path('', CarView.as_view()),
    path('get_cars', GetCar.as_view()),
    path('add_user', AddUser.as_view())
]
