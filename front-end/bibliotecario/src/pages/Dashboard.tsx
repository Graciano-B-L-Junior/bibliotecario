import { Link } from 'react-router-dom'
import './styles/Dashboard.css'

type ReadingBook = {
    title: string
    volume: string
    progress: number
    chapter: string
    activity: string
    rating: string
    cover: string
}

type CollectionBook = {
    title: string
    status: 'Concluído' | 'Planejo Ler' | 'Abandonado'
    rating: string
    dates: string
    notes: string
    cover: string
}

const readingBooks: ReadingBook[] = [
    {
        title: 'Mushoku Tensei: Jobless Reincarnation',
        volume: 'Vol. 1',
        progress: 65,
        chapter: 'Capítulo 14/22',
        activity: '2 dias atrás',
        rating: 'Ainda não avaliado',
        cover: '📕',
    },
    {
        title: 'That Time I Got Reincarnated as a Slime',
        volume: 'Vol. 5',
        progress: 40,
        chapter: 'Capítulo 8/18',
        activity: '4 horas atrás',
        rating: '4.5/5',
        cover: '📘',
    },
]

const collectionBooks: CollectionBook[] = [
    { title: 'Spice and Wolf, Vol. 1', status: 'Concluído', rating: '5/5', dates: '10 Jan - 05 Fev', notes: 'Detalhado', cover: '🌸' },
    { title: 'The Rising of the Shield Hero, Vol. 3', status: 'Planejo Ler', rating: 'N/A', dates: '01 Mar', notes: 'Ainda não', cover: '🛡️' },
    { title: 'No Game No Life, Vol. 1', status: 'Abandonado', rating: '3/5', dates: 'Páginas lidas', notes: '110/240', cover: '🎨' },
]

function Dashboard() {
    return (
        <div className="dashboard-page">
            <aside className="dashboard-sidebar">
                <Link to="/" className="dashboard-brand">
                    <span className="dashboard-brand-icon">📖</span>
                    <strong>Bibliotecário</strong>
                </Link>

                <div className="dashboard-user dashboard-user-top">
                    <span className="avatar">LM</span>
                    <span><strong>Leo Marques</strong><small>Logado em</small></span>
                </div>

                <nav className="dashboard-nav" aria-label="Navegação da biblioteca">
                    <p>Filtros</p>
                    <a className="active" href="#todos"><span>▥</span>Todos os Livros</a>
                    <a href="#lendo"><span>▣</span>Leitura Atual</a>
                    <a href="#planejados"><span>☆</span>Planejo Ler</a>
                    <a href="#concluidos"><span>◷</span>Concluídos</a>

                    <p>Gêneros</p>
                    <select className="genre-select">
                        <option value="aventura">Aventura</option>
                        <option value="fantasia">Fantasia</option>
                        <option value="adulto">Adulto</option>
                    </select>

                    <p>Links Rápidos</p>
                    <a href="#colecao"><span>↗</span>Minha Coleção</a>
                    <a href="#planejados"><span>☆</span>Planejo Ler</a>
                    <a href="#concluidos"><span>□</span>Concluídos</a>
                </nav>

                <button className="sidebar-logout" type="button">
                    <span>⇥</span>
                    Sair
                </button>
            </aside>

            <div className="dashboard-shell">
                <header className="dashboard-header">
                    <div className="dashboard-search">⌕ <span>Buscar livros, autores, gêneros...</span></div>
                    <nav className="dashboard-header-nav" aria-label="Ações da conta">
                        <a href="#novo">⊕ Adicionar Livro</a>
                        <Link to="/">⇥ Sair</Link>
                    </nav>
                </header>

                <main className="dashboard-main dashboard-layout">
                    <section className="dashboard-content">
                        <div className="dashboard-heading">
                            <h1>Minha Biblioteca de Leitura</h1>
                            <button className="progress-button" type="button">↗ Gerenciar Progresso</button>
                        </div>

                        <section className="reading-section" aria-labelledby="reading-title">
                            <h2 id="reading-title">Lendo Atualmente</h2>
                            <div className="reading-grid">
                                {readingBooks.map((book) => (
                                    <article className="reading-card" key={book.title}>
                                        <div className="book-cover">{book.cover}</div>
                                        <div className="reading-details">
                                            <h3>{book.title}, {book.volume}</h3>
                                            <div className="progress-label"><span>Capa</span><span>{book.progress}%</span></div>
                                            <div className="progress-track"><span style={{ width: `${book.progress}%` }} /></div>
                                            <p>{book.chapter}</p>
                                            <p>Última atividade: {book.activity}</p>
                                            <p>{book.rating === 'Ainda não avaliado' ? 'Notas: Awesome plot twist!' : `Avaliação: ${book.rating}`}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="collection-section" aria-labelledby="collection-title">
                            <h2 id="collection-title">Coleção de Livros</h2>
                            <div className="collection-table">
                                <div className="table-row table-heading">
                                    <span>Capa</span><span>Status</span><span>Avaliação ↕</span><span>Datas de Leitura ↕</span><span>Notas</span><span />
                                </div>
                                {collectionBooks.map((book) => (
                                    <div className="table-row" key={book.title}>
                                        <span className="table-book"><b>{book.cover}</b>{book.title}</span>
                                        <span><b className={`status status-${book.status.replace(' ', '-').toLowerCase()}`}>{book.status}</b></span>
                                        <span className="rating">★ {book.rating}</span>
                                        <span>{book.dates}</span>
                                        <span>{book.notes}</span>
                                        <button className="more-button" type="button" aria-label={`Mais opções para ${book.title}`}>⋮</button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </section>

                    <aside className="dashboard-right-rail">
                        <section className="rail-card">
                            <h2>Atividade da Biblioteca</h2>
                            <p><span className="rail-icon green">▢</span><strong>Mushoku Tensei: Jobless Reincarnation, Vol. 1<small>2 horas atrás</small></strong></p>
                            <p><span className="rail-icon blue">▣</span><strong>That Time I Got Reincarnated as a Slime, Vol. 5<small>4 horas atrás</small></strong></p>
                        </section>
                        <section className="rail-card stats-card">
                            <h2>Estatísticas Rápidas</h2>
                            <p><span>Livros Possuídos</span><strong>87</strong></p>
                            <p><span>Lendo Atualmente</span><strong>4</strong></p>
                            <p><span>Concluídos</span><strong>52</strong></p>
                        </section>
                        <section className="rail-card add-book-card">
                            <h2>Adicionar Novo Livro</h2>
                            <p>Gerencie sua coleção de livros.</p>
                            <button type="button">Adicionar Novo Livro</button>
                        </section>
                    </aside>
                </main>
            </div>
        </div>
    )
}

export default Dashboard