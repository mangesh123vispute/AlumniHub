# Generated by Django 5.0.6 on 2024-10-25 03:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0079_alter_user_graduation_month_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='hodprincipalpost',
            name='Image',
            field=models.ImageField(blank=True, default='default/def.jpeg', upload_to='images'),
        ),
    ]
