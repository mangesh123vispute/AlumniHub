# Generated by Django 5.0.6 on 2024-10-17 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0069_alter_user_mobile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='graduation_month',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='graduation_year',
            field=models.IntegerField(default=0),
        ),
    ]
