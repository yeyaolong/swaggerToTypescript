declare interface ApiInterface<T = any> {
    code: number
    data: T
    extra?: any
    isError: boolean
    isSuccess: boolean
    msg: string
    path?: string
    timestamp: string
}