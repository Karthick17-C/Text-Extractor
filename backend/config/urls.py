from django.urls import include, path
from django.http import JsonResponse


def root(request):
    return JsonResponse({
        "message": "Fullstack OCR Django Core Application running",
        "status": "online",
        "version": "1.0.0"
    })


urlpatterns = [
    path("", root, name="root"),
    path("api/", include("apps.users.urls")),
    path("api/", include("apps.ocr.urls")),
    path("api/", include("apps.products.urls")),
    path("api/", include("apps.core.urls")),
]