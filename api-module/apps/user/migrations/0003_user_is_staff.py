# Generated by Django 4.2.11 on 2024-04-22 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="is_staff",
            field=models.BooleanField(default=False),
        ),
    ]
