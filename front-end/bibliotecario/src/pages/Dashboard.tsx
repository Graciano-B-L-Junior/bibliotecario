import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, getApiErrorMessage } from '../api/client'
import type { Evento, Livro, Progresso } from '../api/types'
import './styles/Dashboard.css'

function Dashboard() {
    const navigate = useNavigate()
    const [livros, setLivros] = useState<Livro[]>([])
    const [progressos, setProgressos] = useState<Progresso[]>([])
    const [eventos, setEventos] = useState<Evento[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let isMounted = true

        async function loadDashboard() {
            try {
                const [books, readingProgress, activity] = await Promise.all([
                    api.listLivros(), api.listProgressos(), api.listEventos(),
                ])
                if (isMounted) {
                    setLivros(books); setProgressos(readingProgress); setEventos(activity)
                }
            } catch (requestError) {
                if (isMounted) setError(getApiErrorMessage(requestError))
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        void loadDashboard()
        return () => { isMounted = false }
    }, [])

    function getBook(bookId: number) { return livros.find((book) => book.id === bookId) }
    function logout() { api.logout(); navigate('/login', { replace: true }) }

    const readingBooks = progressos.filter((progress) => progress.status === 'lendo')
    const completedBooks = progressos.filter((progress) => progress.status === 'concluido')

    return <div className="dashboard-page">
        <aside className="dashboard-sidebar">
            <Link to="/" className="dashboard-brand"><span className="dashboard-brand-icon">📖</span><strong>Bibliotecário</strong></Link>
            <div className="dashboard-user dashboard-user-top"><span className="avatar">LC</span><span><strong>Minha conta</strong><small>Usuário autenticado</small></span></div>
            <nav className="dashboard-nav" aria-label="Navegação da biblioteca"><p>Filtros</p><a className="active" href="#todos"><span>▥</span>Todos os Livros</a><a href="#lendo"><span>▣</span>Leitura Atual</a><a href="#planejados"><span>☆</span>Planejo Ler</a><a href="#concluidos"><span>◷</span>Concluídos</a></nav>
            <button className="sidebar-logout" type="button" onClick={logout}><span>⇥</span>Sair</button>
        </aside>
        <div className="dashboard-shell">
            <header className="dashboard-header"><div className="dashboard-search">⌕ <span>Buscar livros...</span></div><nav className="dashboard-header-nav" aria-label="Ações da conta"><Link to="/book/new">⊕ Adicionar Livro</Link><button type="button" onClick={logout}>⇥ Sair</button></nav></header>
            <main className="dashboard-main dashboard-layout"><section className="dashboard-content">
                <div className="dashboard-heading"><h1>Minha Biblioteca de Leitura</h1><Link className="progress-button" to="#lendo">↗ Gerenciar Progresso</Link></div>
                {isLoading && <p role="status">Carregando sua biblioteca...</p>}
                {error && <p role="alert" className="form-error">{error}</p>}
                {!isLoading && !error && livros.length === 0 && <p>Sua biblioteca ainda está vazia.</p>}
                <section className="reading-section" aria-labelledby="reading-title" id="lendo"><h2 id="reading-title">Lendo Atualmente</h2><div className="reading-grid">
                    {readingBooks.map((progress) => { const book = getBook(progress.livro); if (!book) return null; const percentage = book.paginas ? Math.round(progress.pagina_atual / book.paginas * 100) : 0; return <article className="reading-card" key={progress.id}><div className="book-cover">📕</div><div className="reading-details"><h3>{book.nome}</h3><div className="progress-label"><span>Progresso</span><span>{percentage}%</span></div><div className="progress-track"><span style={{ width: `${percentage}%` }} /></div><p>Página {progress.pagina_atual} de {book.paginas}</p><p>Atualizado em {new Date(progress.atualizado_em).toLocaleDateString('pt-BR')}</p></div></article> })}
                </div></section>
                <section className="collection-section" aria-labelledby="collection-title" id="todos"><h2 id="collection-title">Coleção de Livros</h2><div className="collection-table"><div className="table-row table-heading"><span>Livro</span><span>Status</span><span>Páginas</span><span>Progresso</span><span /></div>
                    {livros.map((book) => { const progress = progressos.find((item) => item.livro === book.id); const percentage = progress && book.paginas ? Math.round(progress.pagina_atual / book.paginas * 100) : 0; return <div className="table-row" key={book.id}><span className="table-book"><b>📘</b>{book.nome}</span><span>{progress?.status ?? 'Sem progresso'}</span><span>{book.paginas}</span><span>{progress ? `${percentage}%` : '-'}</span><span /></div> })}
                </div></section>
            </section><aside className="dashboard-right-rail"><section className="rail-card"><h2>Atividade da Biblioteca</h2>{eventos.length === 0 && <p>Nenhuma atividade registrada.</p>}{eventos.slice(0, 4).map((event) => <p key={event.id}><span className="rail-icon green">▢</span><strong>{getBook(event.livro)?.nome ?? 'Livro'}<small>{event.tipo} em {event.pagina} páginas</small></strong></p>)}</section><section className="rail-card stats-card"><h2>Estatísticas Rápidas</h2><p><span>Livros Possuídos</span><strong>{livros.length}</strong></p><p><span>Lendo Atualmente</span><strong>{readingBooks.length}</strong></p><p id="concluidos"><span>Concluídos</span><strong>{completedBooks.length}</strong></p></section><section className="rail-card add-book-card"><h2>Adicionar Novo Livro</h2><p>Gerencie sua coleção de livros.</p><Link to="/book/new">Adicionar Novo Livro</Link></section></aside></main>
        </div>
    </div>
}

export default Dashboard