# Generated by Django 2.0.6 on 2018-06-16 15:42

from django.db import migrations, models
import face.models


class Migration(migrations.Migration):

    dependencies = [
        ('face', '0004_auto_20180615_1215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='person_image',
            name='image',
            field=models.ImageField(upload_to=face.models.person_directory_path),
        ),
    ]
