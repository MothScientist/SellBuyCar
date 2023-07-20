# Generated by Django 4.2.2 on 2023-07-20 15:18

from django.db import migrations, models
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='extrauser',
            name='phone_number',
            field=models.CharField(blank=True, max_length=17, null=True, unique=True, validators=[main.models.validate_phone_number]),
        ),
    ]
