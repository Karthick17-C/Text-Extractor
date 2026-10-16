from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import OCRHistory
from .serializers import OCRHistorySerializer
from .services import OCRService, DEFAULT_MODEL


@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def ocr_extract(request):
    uploaded_file = request.FILES.get("file")
    if not uploaded_file:
        return Response({"error": "An image file is required"}, status=status.HTTP_400_BAD_REQUEST)

    model = request.data.get("model", DEFAULT_MODEL)
    instruction = request.data.get("instruction", "Extract all readable text from the image accurately.")

    text, error = OCRService.extract_text_from_file(uploaded_file, model=model, instruction=instruction)
    if error:
        return Response({"error": error}, status=status.HTTP_502_BAD_GATEWAY)

    OCRService.save_history(
        user=request.user,
        filename=uploaded_file.name,
        extracted_text=text,
        model_used=model
    )

    return Response({"text": text})


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def history(request):
    try:
        limit = min(int(request.query_params.get("limit", 50)), 100)
    except ValueError:
        limit = 50

    records = OCRHistory.objects.filter(user=request.user)[:limit]
    serializer = OCRHistorySerializer(records, many=True)
    return Response({"history": serializer.data, "count": len(serializer.data)})


@api_view(["DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_history(request, history_id):
    deleted, _ = OCRHistory.objects.filter(id=history_id, user=request.user).delete()
    if not deleted:
        return Response({"detail": "History item not found or unauthorized"}, status=status.HTTP_404_NOT_FOUND)
    return Response({"message": "History item deleted successfully"})
