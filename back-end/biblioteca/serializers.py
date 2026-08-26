from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Evento, Livro, Progresso


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Este e-mail já está cadastrado.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LivroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livro
        fields = ["id", "nome", "paginas"]


class ProgressoSerializer(serializers.ModelSerializer):
    usuario = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Progresso
        fields = [
            "id",
            "usuario",
            "livro",
            "status",
            "pagina_atual",
            "atualizado_em",
        ]
        read_only_fields = ["id", "usuario", "atualizado_em"]

    def validate(self, attrs):
        livro = attrs.get("livro", getattr(self.instance, "livro", None))
        pagina_atual = attrs.get(
            "pagina_atual",
            getattr(self.instance, "pagina_atual", 0),
        )

        if livro and pagina_atual > livro.paginas:
            raise serializers.ValidationError(
                {
                    "pagina_atual": (
                        "A página atual não pode ultrapassar o total do livro."
                    )
                }
            )

        return attrs


class EventoSerializer(serializers.ModelSerializer):
    usuario = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Evento
        fields = [
            "id",
            "usuario",
            "livro",
            "progresso",
            "tipo",
            "pagina",
            "criado_em",
        ]
        read_only_fields = ["id", "usuario", "livro", "criado_em"]

    def validate(self, attrs):
        progresso = attrs.get("progresso", getattr(self.instance, "progresso", None))
        pagina = attrs.get("pagina", getattr(self.instance, "pagina", None))

        if progresso and self.context["request"].user != progresso.usuario:
            raise serializers.ValidationError(
                {"progresso": "O progresso informado não pertence ao usuário atual."}
            )

        if progresso and pagina > progresso.livro.paginas:
            raise serializers.ValidationError(
                {"pagina": "A página não pode ultrapassar o total do livro."}
            )

        return attrs