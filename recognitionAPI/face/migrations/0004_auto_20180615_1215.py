# Generated by Django 2.0.6 on 2018-06-15 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('face', '0003_auto_20180615_1115'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person_image',
            name='image',
            field=models.ImageField(upload_to=''),
        ),
    ]