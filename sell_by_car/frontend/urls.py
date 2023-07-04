# https://docs.djangoproject.com/en/4.2/topics/http/urls/
from django.urls import path
from .views import index

urlpatterns = [
    path('', index)
]
