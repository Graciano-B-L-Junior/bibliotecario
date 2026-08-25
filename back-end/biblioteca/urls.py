from rest_framework.routers import DefaultRouter

from .views import EventoViewSet, LivroViewSet, ProgressoViewSet


router = DefaultRouter()
router.register("livros", LivroViewSet, basename="livro")
router.register("progressos", ProgressoViewSet, basename="progresso")
router.register("eventos", EventoViewSet, basename="evento")

urlpatterns = router.urls