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

declare interface HomeData {
    title: string;
    info: Array<{
        label: string | undefined | null,
        value: string | undefined | null
    }>
}