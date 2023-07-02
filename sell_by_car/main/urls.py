from django.urls import path
from . import views

urlpatterns = [
    # Потом вместо полной ссылки в href просто ссылаемся на параметр name данной ссылки
    # (p.s. 21:15 https://www.youtube.com/watch?v=OYeqcxaYUbQ&list=PLDyJYA6aTY1nZ9fSGcsK4wqeu-xaJksQQ&index=5)
    path('', views.main_page_render, name="home")
]
