from django.db import models


# Django автоматически добавляет первичный ключ, если тот не был добавлен вручную

class Cars(models.Model):
    brand = models.CharField(max_length=15)
    model = models.CharField(max_length=30)
    year = models.CharField(max_length=4)

