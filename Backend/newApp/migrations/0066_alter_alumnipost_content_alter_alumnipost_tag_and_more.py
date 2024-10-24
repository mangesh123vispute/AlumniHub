# Generated by Django 5.0.6 on 2024-10-17 04:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newApp', '0065_alter_user_first_name_alter_user_last_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alumnipost',
            name='content',
            field=models.TextField(default='-'),
        ),
        migrations.AlterField(
            model_name='alumnipost',
            name='tag',
            field=models.CharField(default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='alumnipost',
            name='title',
            field=models.CharField(default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='alumniprofile',
            name='Education',
            field=models.CharField(blank=True, default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='alumniprofile',
            name='Heading',
            field=models.CharField(blank=True, default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='alumniprofile',
            name='achievements',
            field=models.TextField(blank=True, default='-'),
        ),
        migrations.AlterField(
            model_name='alumniprofile',
            name='current_city',
            field=models.CharField(blank=True, default='-', max_length=100),
        ),
        migrations.AlterField(
            model_name='alumniprofile',
            name='current_company_name',
            field=models.CharField(blank=True, default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='alumniprofile',
            name='current_country',
            field=models.CharField(blank=True, default='-', max_length=100),
        ),
        migrations.AlterField(
            model_name='alumniprofile',
            name='industry',
            field=models.CharField(blank=True, default='-', max_length=100),
        ),
        migrations.AlterField(
            model_name='alumniprofile',
            name='job_title',
            field=models.CharField(blank=True, default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='alumniprofile',
            name='previous_companies',
            field=models.TextField(blank=True, default='-'),
        ),
        migrations.AlterField(
            model_name='hodprincipalpost',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='hodprincipalpost',
            name='content',
            field=models.TextField(default='-'),
        ),
        migrations.AlterField(
            model_name='hodprincipalpost',
            name='tag',
            field=models.CharField(default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='hodprincipalpost',
            name='title',
            field=models.CharField(default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='hodprincipalprofile',
            name='designation',
            field=models.CharField(blank=True, default='-', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='studentprofile',
            name='Education',
            field=models.CharField(blank=True, default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='studentprofile',
            name='Heading',
            field=models.CharField(blank=True, default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='studentprofile',
            name='current_year_of_study',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='About',
            field=models.TextField(blank=True, default='-', max_length=800),
        ),
        migrations.AlterField(
            model_name='user',
            name='Branch',
            field=models.CharField(blank=True, default='-', max_length=50),
        ),
        migrations.AlterField(
            model_name='user',
            name='Github',
            field=models.CharField(blank=True, default='-', max_length=100),
        ),
        migrations.AlterField(
            model_name='user',
            name='Work',
            field=models.TextField(blank=True, default='-', max_length=800),
        ),
        migrations.AlterField(
            model_name='user',
            name='Year_Joined',
            field=models.CharField(blank=True, default='-', max_length=4),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, default='-', max_length=254),
        ),
        migrations.AlterField(
            model_name='user',
            name='full_name',
            field=models.CharField(blank=True, default='-', max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='instagram',
            field=models.CharField(blank=True, default='-', max_length=100),
        ),
        migrations.AlterField(
            model_name='user',
            name='linkedin',
            field=models.CharField(blank=True, default='-', max_length=100),
        ),
        migrations.AlterField(
            model_name='user',
            name='mobile',
            field=models.CharField(blank=True, default='-', max_length=10),
        ),
        migrations.AlterField(
            model_name='user',
            name='portfolio_link',
            field=models.URLField(blank=True, default='-', max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='resume_link',
            field=models.URLField(blank=True, default='-', max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='skills',
            field=models.TextField(blank=True, default='-'),
        ),
    ]
