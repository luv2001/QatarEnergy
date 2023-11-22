from django.urls import path
from . import views

urlpatterns = [
    path('insert-data/', views.insert_data, name='insert_data'),
    path('get-all-data/', views.get_all_data, name='get_all_data'),
    path('get-data-by-filters/', views.get_data_by_filters, name='get_data_by_filters'),
]
