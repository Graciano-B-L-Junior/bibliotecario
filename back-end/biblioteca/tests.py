from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Livro, Progresso


class BibliotecaApiTests(APITestCase):
	def setUp(self):
		self.usuario = User.objects.create_user(
			username="leitor",
			email="leitor@example.com",
			password="senha-segura-123",
		)
		self.outro_usuario = User.objects.create_user(
			username="outro-leitor",
			email="outro@example.com",
			password="senha-segura-456",
		)
		self.livro = Livro.objects.create(nome="Livro de teste", paginas=100)

	def test_livros_podem_ser_listados_sem_login(self):
		response = self.client.get("/api/livros/")

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data[0]["nome"], self.livro.nome)

	def test_jwt_pode_ser_obtido_com_credenciais(self):
		response = self.client.post(
			"/api/token/",
			{"username": "leitor", "password": "senha-segura-123"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertIn("access", response.data)
		self.assertIn("refresh", response.data)

	def test_usuario_pode_ser_cadastrado(self):
		response = self.client.post(
			"/api/register/",
			{
				"username": "novo-leitor",
				"email": "novo@example.com",
				"password": "senha-segura-789",
			},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertTrue(User.objects.filter(username="novo-leitor").exists())
		self.assertNotEqual(
			User.objects.get(username="novo-leitor").password,
			"senha-segura-789",
		)

	def test_cadastro_rejeita_email_duplicado(self):
		response = self.client.post(
			"/api/register/",
			{
				"username": "outro-leitor",
				"email": "LEITOR@EXAMPLE.COM",
				"password": "senha-segura-789",
			},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertIn("email", response.data)

	def test_progresso_exige_login_e_isola_usuario(self):
		progresso = Progresso.objects.create(
			usuario=self.usuario,
			livro=self.livro,
			pagina_atual=20,
		)

		response = self.client.get("/api/progressos/")
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

		self.client.force_authenticate(user=self.outro_usuario)
		response = self.client.get("/api/progressos/")
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data, [])

		self.client.force_authenticate(user=self.usuario)
		response = self.client.get("/api/progressos/")
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data[0]["id"], progresso.id)

	def test_progresso_rejeita_pagina_maior_que_o_livro(self):
		self.client.force_authenticate(user=self.usuario)

		response = self.client.post(
			"/api/progressos/",
			{
				"livro": self.livro.id,
				"status": "lendo",
				"pagina_atual": 101,
			},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertIn("pagina_atual", response.data)
