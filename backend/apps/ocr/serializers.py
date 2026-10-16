from rest_framework import serializers
from .models import OCRHistory


class OCRHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OCRHistory
        fields = ["id", "filename", "extracted_text", "model_used", "created_at"]
