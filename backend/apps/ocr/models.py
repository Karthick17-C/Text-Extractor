from django.contrib.auth.models import User
from django.db import models


class OCRHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ocr_history")
    filename = models.CharField(max_length=255, blank=True)
    extracted_text = models.TextField()
    model_used = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "ocr_ocrhistory"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.filename or 'Untitled'} ({self.created_at:%Y-%m-%d %H:%M})"
