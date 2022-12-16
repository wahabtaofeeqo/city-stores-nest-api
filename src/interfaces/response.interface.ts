export interface OkResonse {
    status: boolean
    message: string
    data?: any
}

export interface ErrResponse {
    status: boolean
    message: string
    error?: any
}