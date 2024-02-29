from django.db import models
from djongo import models


class ChemicalRecord(models.Model):
    well = models.CharField(max_length=255, blank=False, verbose_name='Well Number')
    service = models.CharField(max_length=100, blank=False, verbose_name='Service')
    date_done = models.DateField(blank=False, verbose_name='Date Done')
    field = models.CharField(max_length=100, blank=True, verbose_name='Field')
    jacket = models.CharField(max_length=100, blank=True, verbose_name='Jacket')
    supervisor = models.CharField(max_length=100, blank=True, verbose_name='Supervisor')
    comments = models.TextField(blank=True, verbose_name='Comments')
    whj = models.CharField(max_length=255, blank=True, verbose_name='Whj')

    def __str__(self):
        return f"Well {self.well} - {self.service} - {self.date_done}"
