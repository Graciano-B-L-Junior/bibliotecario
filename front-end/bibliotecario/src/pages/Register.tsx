import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, getApiErrorMessage } from '../api/client'
import './styles/Register.css'

function UserRegister() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')
        if (password !== passwordConfirmation) {
            setError('As senhas precisam ser iguais.')
            return
        }
        setIsSubmitting(true)
        try {
            await api.register({ username, email, password })
            navigate('/login', { replace: true })
        } catch (requestError) {
            setError(getApiErrorMessage(requestError))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="page">
            <form className="form-register" onSubmit={handleSubmit}>
                <div className="title">
                    <p>
                        <span className="logo">📚</span>
                        Bibliotecário
                    </p>
                    <h2>Crie a sua conta</h2>
                </div>
                <label htmlFor="user">Nome usuário</label>
                <input type="text" name="user" id="user-field" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />

                <label htmlFor="user-email">E-mail</label>
                <input type="email" name="user-email" id="user-email-field" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />

                <label htmlFor="user-password">Senha</label>
                <input type="password" name="user-password" id="user-password-field" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required />

                <label htmlFor="user-password-repeat">Confirmar Senha</label>
                <input type="password" name="user-password-repeat" id="user-password-repeat-field" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} autoComplete="new-password" required />

                {error && <p role="alert" className="form-error">{error}</p>}
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Cadastrando...' : 'Cadastre-se'}</button>

                <p>
                    Já tem uma conta? <Link to="/login">Entrar</Link>
                </p>
            </form>
        </div>
    )
}

export default UserRegister