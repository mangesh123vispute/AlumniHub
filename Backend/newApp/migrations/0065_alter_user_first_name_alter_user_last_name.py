# Generated by Django 5.0.6 on 2024-10-17 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0064_alter_user_graduation_month_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='first name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='last name'),
        ),
    ]
