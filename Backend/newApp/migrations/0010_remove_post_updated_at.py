# Generated by Django 4.2.6 on 2024-02-16 08:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0009_post_updated_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='updated_at',
        ),
    ]