
import './styles/Register.css'

function UserRegister(){
    return (
        <div className="page">
            <form className="form-register">
                <div className="title">
                    <p>
                        <span className="logo">📚</span>
                        Bibliotecário
                    </p>
                    <h2>Crie a sua conta</h2>
                </div>
                <label htmlFor="user">Nome usuário</label>
                <input type="text" name="user" id="user-field" />

                <label htmlFor="user-email">E-mail</label>
                <input type="email" name="user-email" id="user-email-field" />

                <label htmlFor="user-password">Senha</label>
                <input type="password" name="user-password" id="user-password-field" />

                <label htmlFor="user-password-repeat">Confirmar Senha</label>
                <input type="password" name="user-password-repeat" id="user-password-repeat-field" />

                <button type="submit">Cadastre-se</button>

                <p>
                    Já tem uma conta? <a href="">Entrar</a>
                </p>
            </form>
        </div>
    )
}

export default UserRegister