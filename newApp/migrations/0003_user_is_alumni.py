# Generated by Django 4.2.6 on 2024-02-12 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0002_alter_user_first_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_alumni',
            field=models.BooleanField(default=False),
        ),
    ]
