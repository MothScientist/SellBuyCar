# https://docs.djangoproject.com/en/4.2/topics/http/urls/
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
    path('cars_db/', include('car_database.urls')),
    path('auth/', include('authorization_and_personal_account.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
