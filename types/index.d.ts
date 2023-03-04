
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

declare interface Property {
    type: string; // 参数类型 'string' | 'boolean' 等基本参数类型，以及对象比如RemoteData<string, string>
    description: string; // 参数描述
    format?: string; // 参数格式 比如日期类型参数 {type: string; format: 'date-time'}
    $ref?: string; // 引用。一般是对象参数，比如'#/definitions/RemoteData«string,string»'，就又引用了一个RemoteData<T>类型
    originalRef?: string; // 引用，和$ref一样，不过字符串是'RemoteData«string,string»'
    items?: {    // 数组参数的元素类型
        originalRef?: string;
        $ref: string;
    },
    
}

declare interface Definition {
    type: string; // 参数类型 'object' | 'array'
    properties: {
        [key: string]: Property;
    }
    title?: string; // 参数名
    description: string; // 参数描述 比如 {title:ActiveInfoPageDTO，description: 活动 }

}

declare interface Definitions  {
    [key: string]: Definition;
}