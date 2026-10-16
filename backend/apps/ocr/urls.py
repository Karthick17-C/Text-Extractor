from django.urls import path
from . import views

urlpatterns = [
    path("ocr", views.ocr_extract, name="ocr-extract"),
    path("user/history", views.history, name="ocr-history"),
    path("user/history/<int:history_id>", views.delete_history, name="ocr-delete-history"),
]
