import { Link } from 'react-router-dom'
import './styles/NewBook.css'

function NewBook() {
    return (
        <div className="new-book-page">
            <header className="new-book-header">
                <Link to="/dashboard" className="new-book-brand">
                    <span>📖</span>
                    <strong>Bibliotecário</strong>
                </Link>
                <Link to="/dashboard" className="back-to-dashboard">Voltar ao dashboard</Link>
            </header>

            <main className="new-book-main">
                <section className="new-book-panel">
                    <div className="new-book-title">
                        <span className="new-book-icon">📚</span>
                        <div>
                            <p>Minha biblioteca</p>
                            <h1>Adicionar novo livro</h1>
                        </div>
                    </div>

                    <form className="new-book-form">
                        <label htmlFor="book-title">Título do livro</label>
                        <input id="book-title" name="title" type="text" placeholder="Ex.: O Nome do Vento" required />

                        <label htmlFor="book-author">Autor</label>
                        <input id="book-author" name="author" type="text" placeholder="Nome do autor" required />

                        <div className="new-book-fields">
                            <div>
                                <label htmlFor="book-genre">Gênero</label>
                                <select id="book-genre" name="genre" defaultValue="">
                                    <option value="" disabled>Selecione</option>
                                    <option value="fantasia">Fantasia</option>
                                    <option value="romance">Romance</option>
                                    <option value="ficcao">Ficção</option>
                                    <option value="manga">Mangá</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="book-status">Status</label>
                                <select id="book-status" name="status" defaultValue="planejo-ler">
                                    <option value="planejo-ler">Planejo ler</option>
                                    <option value="lendo">Lendo</option>
                                    <option value="concluido">Concluído</option>
                                </select>
                            </div>
                        </div>

                        <label htmlFor="book-notes">Observações <span>(opcional)</span></label>
                        <textarea id="book-notes" name="notes" rows={4} placeholder="Adicione uma observação sobre este livro" />

                        <button type="submit">Adicionar à biblioteca</button>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default NewBook