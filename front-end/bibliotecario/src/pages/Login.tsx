import { Link } from "react-router-dom"
import './styles/Login.css'

function Login(){

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
                <form method="post">
                    <label htmlFor="user-name">E-mail</label>
                    <input type="text" name="user-name" id="user-name-field" />

                    <label htmlFor="user-password">Senha</label>
                    <input type="password" name="user-password" id="user-password-field" />

                    <a href="">Esqueceu a senha?</a>

                    <button type="submit">Entrar</button>
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