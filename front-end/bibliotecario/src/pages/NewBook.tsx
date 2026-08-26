import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, getApiErrorMessage } from '../api/client'
import type { StatusProgresso } from '../api/types'
import './styles/NewBook.css'

function NewBook() {
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [paginas, setPaginas] = useState('')
    const [status, setStatus] = useState<StatusProgresso>('pretendo_ler')
    const [paginaAtual, setPaginaAtual] = useState('0')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); setError(''); setIsSubmitting(true)
        try {
            const book = await api.createLivro({ nome, paginas: Number(paginas) })
            await api.createProgresso({ livro: book.id, status, pagina_atual: Number(paginaAtual) })
            navigate('/dashboard', { replace: true })
        } catch (requestError) { setError(getApiErrorMessage(requestError)) } finally { setIsSubmitting(false) }
    }

    return <div className="new-book-page"><header className="new-book-header"><Link to="/dashboard" className="new-book-brand"><span>📖</span><strong>Bibliotecário</strong></Link><Link to="/dashboard" className="back-to-dashboard">Voltar ao dashboard</Link></header><main className="new-book-main"><section className="new-book-panel"><div className="new-book-title"><span className="new-book-icon">📚</span><div><p>Minha biblioteca</p><h1>Adicionar novo livro</h1></div></div><form className="new-book-form" onSubmit={handleSubmit}><label htmlFor="book-title">Título do livro</label><input id="book-title" value={nome} onChange={(event) => setNome(event.target.value)} type="text" required /><label htmlFor="book-pages">Quantidade de páginas</label><input id="book-pages" value={paginas} onChange={(event) => setPaginas(event.target.value)} type="number" min="1" required /><label htmlFor="book-status">Status inicial</label><select id="book-status" value={status} onChange={(event) => setStatus(event.target.value as StatusProgresso)}><option value="pretendo_ler">Pretendo ler</option><option value="lendo">Lendo</option><option value="pausado">Pausado</option><option value="concluido">Concluído</option></select><label htmlFor="book-current-page">Página atual</label><input id="book-current-page" value={paginaAtual} onChange={(event) => setPaginaAtual(event.target.value)} type="number" min="0" required />{error && <p role="alert" className="form-error">{error}</p>}<button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Adicionar à biblioteca'}</button></form></section></main></div>
}

export default NewBook