from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Livro(models.Model):
    nome = models.CharField(max_length=255)
    paginas = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.nome

class Progresso(models.Model):
    class Status(models.TextChoices):
        PRETENDO_LER = "pretendo_ler", "Pretendo ler"
        LENDO = "lendo", "Lendo"
        PAUSADO = "pausado", "Pausado"
        CONCLUIDO = "concluido", "Concluído"

    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="progressos",
    )

    livro = models.ForeignKey(
        Livro,
        on_delete=models.CASCADE,
        related_name="progressos"
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PRETENDO_LER
    )
    pagina_atual = models.PositiveIntegerField(default=0)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["usuario", "livro"],
                name="progresso_unico_por_usuario_livro"
            )
        ]

    def __str__(self):
        return f"{self.usuario.username} - {self.livro.nome}"

class Evento(models.Model):
    class Tipo(models.TextChoices):
        INICIO = "inicio", "Início"
        AVANCO = "avanco", "Avanço"
        PAUSA = "pausa", "Pausa"
        CONCLUSAO = "conclusao", "Conclusão"

    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="eventos",
    )
    livro = models.ForeignKey(
        Livro,
        on_delete=models.CASCADE,
        related_name="eventos",
    )
    progresso = models.ForeignKey(
        Progresso,
        on_delete=models.CASCADE,
        related_name="eventos",
    )
    tipo = models.CharField(max_length=20, choices=Tipo.choices)
    pagina = models.PositiveIntegerField()
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo} - {self.livro.nome}"
