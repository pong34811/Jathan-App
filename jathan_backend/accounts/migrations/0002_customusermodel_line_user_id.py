# Generated by Django 4.2.4 on 2025-02-11 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customusermodel',
            name='line_user_id',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='LINE User ID'),
        ),
    ]
