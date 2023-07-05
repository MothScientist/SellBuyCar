# https://docs.djangoproject.com/en/4.2/topics/http/urls/
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('aboutPage', index),
    path('authentification', index),
    path('cabinet', index),
    path('cart', index),
    path('map', index),
    path('search', index),


]