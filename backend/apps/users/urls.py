from django.urls import path
from . import views

urlpatterns = [
    path("auth/signup", views.signup, name="user-signup"),
    path("auth/login", views.login, name="user-login"),
    path("user/profile", views.profile, name="user-profile"),
]
