# Generated by Django 5.0.6 on 2024-10-17 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0067_alter_alumnipost_docurl_alter_alumnipost_image_url_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='mobile',
            field=models.CharField(default='----------', max_length=10),
        ),
    ]
