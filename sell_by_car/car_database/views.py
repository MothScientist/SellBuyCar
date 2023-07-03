from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse('<h1>Проверка работы приложения базы данных. '
                        'Здесь будет страница для добавления новых машин в базу данных, так как условный сотрудник'
                        'не сможет лезть в админ панельку сайта.</h1>')
