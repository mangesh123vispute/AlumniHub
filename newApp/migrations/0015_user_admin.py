# Generated by Django 4.2.6 on 2024-02-17 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0014_remove_user_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='admin',
            field=models.BooleanField(default=False),
        ),
    ]