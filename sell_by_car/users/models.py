from django.db import models
from django.core.exceptions import ValidationError  # for raise exceptions in custom validators
from django.contrib.auth.models import AbstractUser  # inheritance from built-in model


def validate_email_address(value):
    if not value.endswith('@example.com'):
        raise ValidationError('Only email addresses ending with "@example.com" are allowed.')


def validate_phone_number(value):
    if not value.startswith('+'):
        raise ValidationError('Phone number should start with "+"')

# https://stackoverflow.com/questions/44651760/django-db-migrations-exceptions-inconsistentmigrationhistory


class Users(AbstractUser):
    birth_date = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, validators=[validate_phone_number], unique=True, blank=True)
