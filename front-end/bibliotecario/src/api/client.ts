import type {
    Evento,
    EventoPayload,
    Livro,
    LivroPayload,
    LoginPayload,
    RegistrationPayload,
    Progresso,
    ProgressoPayload,
    TokenResponse,
} from './types'

const API_URL = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '')
const ACCESS_TOKEN_KEY = 'bibliotecario_access_token'
const REFRESH_TOKEN_KEY = 'bibliotecario_refresh_token'

type ApiErrorBody = {
    detail?: string
    [field: string]: unknown
}

export class ApiError extends Error {
    status: number
    body: ApiErrorBody | null

    constructor(status: number, body: ApiErrorBody | null) {
        super(body?.detail ?? `A requisição falhou (${status}).`)
        this.name = 'ApiError'
        this.status = status
        this.body = body
    }
}

export function getApiErrorMessage(error: unknown, fallback = 'Não foi possível concluir a operação.') {
    if (error instanceof ApiError) {
        if (error.body) {
            const messages = Object.values(error.body)
                .flatMap((value) => Array.isArray(value) ? value : [value])
                .filter((value): value is string => typeof value === 'string')

            if (messages.length > 0) {
                return messages.join(' ')
            }
        }

        return error.message
    }

    return fallback
}

function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function saveTokens(tokens: TokenResponse) {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh)
}

export function clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function isAuthenticated() {
    return Boolean(getAccessToken())
}

async function parseBody(response: Response): Promise<unknown> {
    const text = await response.text()

    if (!text) {
        return null
    }

    try {
        return JSON.parse(text) as unknown
    } catch {
        return { detail: text }
    }
}

async function refreshAccessToken() {
    const refresh = getRefreshToken()

    if (!refresh) {
        return false
    }

    const response = await fetch(`${API_URL}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
    })

    if (!response.ok) {
        clearTokens()
        return false
    }

    const body = await parseBody(response) as { access?: string } | null

    if (!body?.access) {
        clearTokens()
        return false
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, body.access)
    return true
}

async function request<T>(path: string, options: RequestInit = {}, canRefresh = true): Promise<T> {
    const headers = new Headers(options.headers)
    headers.set('Content-Type', 'application/json')

    const access = getAccessToken()
    if (access) {
        headers.set('Authorization', `Bearer ${access}`)
    }

    const response = await fetch(`${API_URL}${path}`, { ...options, headers })

    if (response.status === 401 && canRefresh && await refreshAccessToken()) {
        return request<T>(path, options, false)
    }

    const body = await parseBody(response)

    if (!response.ok) {
        throw new ApiError(
            response.status,
            body && typeof body === 'object' ? body as ApiErrorBody : null,
        )
    }

    return body as T
}

export const api = {
    login(payload: LoginPayload) {
        return request<TokenResponse>('/token/', {
            method: 'POST',
            body: JSON.stringify(payload),
        }).then((tokens) => {
            saveTokens(tokens)
            return tokens
        })
    },

    register(payload: RegistrationPayload) {
        return request<{ username: string; email: string }>('/register/', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },

    logout() {
        clearTokens()
    },

    listLivros() {
        return request<Livro[]>('/livros/')
    },

    createLivro(payload: LivroPayload) {
        return request<Livro>('/livros/', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },

    updateLivro(id: number, payload: Partial<LivroPayload>) {
        return request<Livro>(`/livros/${id}/`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
        })
    },

    deleteLivro(id: number) {
        return request<null>(`/livros/${id}/`, { method: 'DELETE' })
    },

    listProgressos() {
        return request<Progresso[]>('/progressos/')
    },

    createProgresso(payload: ProgressoPayload) {
        return request<Progresso>('/progressos/', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },

    updateProgresso(id: number, payload: Partial<ProgressoPayload>) {
        return request<Progresso>(`/progressos/${id}/`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
        })
    },

    listEventos() {
        return request<Evento[]>('/eventos/')
    },

    createEvento(payload: EventoPayload) {
        return request<Evento>('/eventos/', {
            method: 'POST',
            body: JSON.stringify(payload),
        })
    },
}
