"""
URL configuration for QatarEnergy project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Describe your API information
api_info = openapi.Info(
    title="Qatar Energy API",
    default_version='v1',
    description="API for managing energy-related data in Qatar.",
    terms_of_service="https://www.yourapp.com/terms/",
    contact=openapi.Contact(email="contact@yourapp.com"),
    license=openapi.License(name="Your License"),
)

# Create schema view with API information
schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('qatarenergy/', include('app.urls')),

    # Swagger and ReDoc URLs
    path('swagger<str:format>', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Include docs URL only in DEBUG mode
if settings.DEBUG:
    urlpatterns += [
        path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]
