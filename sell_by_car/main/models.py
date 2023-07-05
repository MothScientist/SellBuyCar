from django.db import models
from django.core.validators import MaxLengthValidator, RegexValidator


# Django automatically adds the primary key if it hasn't been added manually
# or use this: id = models.BigAutoField(primary_key=True)

class Cars(models.Model):
    brand = models.CharField(max_length=15)  # Renault
    model = models.CharField(max_length=30)  # Logan

    # a four-digit number, such as 2021 ->
    year = models.PositiveIntegerField(validators=[RegexValidator(r'^\d{4}$',
                                                                  message="four-digit number")
                                                   ])

    # Either None or up to 7 digits not starting with 0 (for example, None or 315000, but not 015000 -> 15000)
    mileage = models.PositiveIntegerField(validators=[
        MaxLengthValidator(7),
        RegexValidator(r'(^(?!0)\d{1,7}$)|(^None$)',
                       message="Either None or up to 7 digits not starting with 0")
    ])

    # 3 to 8 digits not starting with 0 and without char $ (for example, 40000)
    price = models.PositiveIntegerField(validators=[
        MaxLengthValidator(8),
        RegexValidator(r'(^(?!0)\d{3,8}$)|(^None$)',
                       message="3-8 digits, not starting with 0 and without char $")
    ])

    warranty = models.DateField()  # 15.05.2025

    # For example, 1240 (without 'kg')
    weight = models.IntegerField(validators=[
        MaxLengthValidator(4),
        RegexValidator(r'(^(?!0)\d{3,4}$)|(^None$)', message="3-4 digits, not starting with 0")
    ])

    accident = models.BooleanField(default=False)

    car_owners = models.PositiveIntegerField(validators=[
        MaxLengthValidator(2),
        RegexValidator(r'(^(?!0)\d{1,2}$)|(^None$)', message="1-2 digits, not starting with 0")
    ])

    # 0-100 km/h in sec (for example, 3.96, 0.34, 185.65, 12.65)
    to_100 = models.DecimalField(max_digits=5,
                                 decimal_places=2,
                                 validators=[RegexValidator(r'^\d{1,3}\.\d{2}$',
                                             message="1-3 digits before dot and 2 digits after dot")
                                             ])

    # V - v-shaped engine, I - in-line engine, F - boxer engine
    engine = models.CharField(
        max_length=2,
        validators=[RegexValidator(r'^(V|I|F)[1-9]|1[0-6]$',
                                   message="V, I or F and number of cylinders (example: V8 or I4)")
                    ])

    # horsepower, or kWh
    power = models.CharField(
        max_length=4,
        validators=[RegexValidator(r'^[1-9]\d{1,3}$', message="2-4 digits, not starting with 0")
                    ])

    # Nm
    torque = models.CharField(
        max_length=4,
        validators=[RegexValidator(r'^[1-9]\d{1,3}$', message="2-4 digits, not starting with 0")
                    ])

    def __str__(self):
        return self.brand


# substitute in _____ the name of the application in which we are doing the migration, for example main
# python manage.py makemigrations
# python manage.py migrate
