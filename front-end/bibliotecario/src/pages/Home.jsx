
import './styles/Home.css'

function Home() {
    return (
        <div className="page">
            <header className='topbar'>
                <div className='logo'>
                    <span className="logo-icon">📚</span>
                    <span>Bibliotecario</span>
                </div>
                <nav className="nav-links">
                    <a href="#recursos">Recursos</a>
                    <a href="#precos">Preços</a>
                    <a href="#sobre">Sobre Nós</a>
                </nav>
            </header>

            <main className="hero">
                <div className="hero-text">
                    <h1>Sua Coleção,<br />Seu Mundo.</h1>
                    <p>Bem-vindo Bibliotecario, o seu refúgio pessoal para organizar e acompanhar todas as suas aventuras literárias, físicas e digitais.</p>
                </div>

                <div className="hero-visual">
                    <div className="hero-card">
                        <img src="" alt="" />
                    </div>
                </div>
            </main>

            <section className="info-cards">
                <article className="info-card">
                    <div className="card-icon">📚</div>
                    <h2>Para Que Serve?</h2>
                    <p>Acompanhe seu progresso de leitura, gerencie volumes em sua Light Novel ou série, e categorize sua coleção por gênero, status e avaliação.</p>
                </article>

                <article className="info-card">
                    <div className="card-icon">🌍</div>
                    <h2>O Que é?</h2>
                    <p>Um sistema de biblioteca pessoal, seguro e customizável, projetado para o leitor moderno. Descubra estatísticas e conecte-se com sua paixão.</p>
                </article>
            </section>

            <section className="cta-row">
                <button className="cta-primary">Cadastre-se para Começar</button>
                <button className="cta-secondary">Entrar na Sua Estante</button>
            </section>

            <footer className="page-footer">
                <p>Já tem uma conta? <a href="#login">Entrar →</a></p>
            </footer>


        </div>
    )
}

export default Home