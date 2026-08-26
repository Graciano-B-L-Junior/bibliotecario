from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import EventoViewSet, LivroViewSet, ProgressoViewSet, UserRegistrationView


router = DefaultRouter()
router.register("livros", LivroViewSet, basename="livro")
router.register("progressos", ProgressoViewSet, basename="progresso")
router.register("eventos", EventoViewSet, basename="evento")

urlpatterns = [
	path("register/", UserRegistrationView.as_view(), name="register"),
	*router.urls,
]