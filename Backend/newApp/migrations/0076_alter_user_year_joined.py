# Generated by Django 5.0.6 on 2024-10-18 03:35

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0075_alter_user_year_joined'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='Year_Joined',
            field=models.IntegerField(blank=True, default=0, validators=[django.core.validators.MinValueValidator(1983), django.core.validators.MaxValueValidator(2100)]),
        ),
    ]
