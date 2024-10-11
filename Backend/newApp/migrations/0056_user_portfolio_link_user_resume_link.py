# Generated by Django 5.0.6 on 2024-10-10 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0055_remove_alumniprofile_profile_picture_url_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='portfolio_link',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='resume_link',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]