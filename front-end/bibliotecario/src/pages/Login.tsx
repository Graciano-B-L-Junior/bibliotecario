import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api, getApiErrorMessage } from "../api/client"
import './styles/Login.css'

function Login(){
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            await api.login({ username, password })
            navigate('/dashboard', { replace: true })
        } catch (requestError) {
            setError(getApiErrorMessage(requestError, 'Usuário ou senha inválidos.'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
    <div className="page">
        <header className="topbar">
            <p>
                <span className="logo"></span> Bibliotecário
            </p>
        </header>
        <main>
            <div className="modal-wrapper">
                <h2>Entre na sua estante</h2>
                <img src="" alt="" />
                <p>Acesse sua coleção pessoal e continue sua jornada literária</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="user-name-field">Usuário</label>
                    <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" name="username" id="user-name-field" autoComplete="username" required />

                    <label htmlFor="user-password">Senha</label>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" name="password" id="user-password-field" autoComplete="current-password" required />

                    {error && <p role="alert" className="form-error">{error}</p>}

                    <a href="">Esqueceu a senha?</a>

                    <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Entrando...' : 'Entrar'}</button>
                </form>

                <p>
                    Não tem conta? <Link to="/register">Cadastre-se</Link>
                </p>
            </div>
        </main>
        <footer className="cool-stuff">

        </footer>
    </div>
    )
}

export default Login