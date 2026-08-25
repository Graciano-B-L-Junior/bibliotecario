from rest_framework import permissions, serializers, viewsets

from .models import Evento, Livro, Progresso
from .serializers import EventoSerializer, LivroSerializer, ProgressoSerializer


class LivroViewSet(viewsets.ModelViewSet):
	queryset = Livro.objects.all().order_by("nome")
	serializer_class = LivroSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProgressoViewSet(viewsets.ModelViewSet):
	serializer_class = ProgressoSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return (
			Progresso.objects
			.filter(usuario=self.request.user)
			.select_related("livro")
			.order_by("-atualizado_em")
		)

	def perform_create(self, serializer):
		serializer.save(usuario=self.request.user)


class EventoViewSet(viewsets.ModelViewSet):
	serializer_class = EventoSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return (
			Evento.objects
			.filter(usuario=self.request.user)
			.select_related("livro", "progresso")
			.order_by("-criado_em")
		)

	def perform_create(self, serializer):
		progresso = serializer.validated_data["progresso"]

		if progresso.usuario != self.request.user:
			raise serializers.ValidationError(
				"Você não pode criar eventos para outro usuário."
			)

		serializer.save(usuario=self.request.user, livro=progresso.livro)
