from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse('<h1>Проверка работы приложения авторизации.'
                        'В этом приложении будет авторизация и личный кабинет, а также все алгоритмы'
                        'проверки пользователя и входа.</h1>')
