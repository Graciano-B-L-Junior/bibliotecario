export type Livro = {
    id: number
    nome: string
    paginas: number
}

export type StatusProgresso =
    | 'pretendo_ler'
    | 'lendo'
    | 'pausado'
    | 'concluido'

export type Progresso = {
    id: number
    usuario: string
    livro: number
    status: StatusProgresso
    pagina_atual: number
    atualizado_em: string
}

export type TipoEvento = 'inicio' | 'avanco' | 'pausa' | 'conclusao'

export type Evento = {
    id: number
    usuario: string
    livro: number
    progresso: number
    tipo: TipoEvento
    pagina: number
    criado_em: string
}

export type TokenResponse = {
    access: string
    refresh: string
}

export type LoginPayload = {
    username: string
    password: string
}

export type RegistrationPayload = LoginPayload & {
    email: string
}

export type LivroPayload = {
    nome: string
    paginas: number
}

export type ProgressoPayload = {
    livro: number
    status: StatusProgresso
    pagina_atual: number
}

export type EventoPayload = {
    progresso: number
    tipo: TipoEvento
    pagina: number
}
