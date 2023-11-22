from django.db import models

class ChemicalRecord(models.Model):
    well = models.CharField(verbose_name='Well Number', blank=False)
    service = models.CharField(max_length=100, verbose_name='Service', blank=False)
    date_done = models.DateField(verbose_name='Date Done', blank=False)
    field = models.CharField(max_length=100, verbose_name='Field', blank=True)
    jacket = models.CharField(max_length=100, verbose_name='Jacket', blank=True)
    supervisor = models.CharField(max_length=100, verbose_name='Supervisor', blank=True)
    comments = models.TextField(verbose_name='Comments', blank=True)
    whj = models.CharField(verbose_name='Whj', blank=True)

    def __str__(self):
        return f"Well {self.well} - {self.service} - {self.date_done}"
