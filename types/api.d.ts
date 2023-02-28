import type { AxiosResponse } from "axios";

export type MircoApp = {
    location: string;
    name: string;
    swaggerVersion: string;
    url: string;
}
export interface SwaggerResourceResponse extends AxiosResponse<Array<MircoApp>>{

}

export type Contact = {
    name: string;
    description: string;
    license: {
        name: string;
        url: string;
    }
    title: string;
    version: string;
}

export type Schema = {
    $ref: string;
    originalRef: string;
}

export type Parameters = {
    description: string;
    in: string;
    name: string;
    required: boolean;
    type?: string;
    schema?: Schema;

}

export type Response = {
    [k: string]: {
        description: string;
        schema?: Schema;
    }
}

export type Post = {
    consumes: Array<string>;
    deprecated: boolean;
    operationId: string;
    parameters: Array<Parameters>;
    produces: Array<string>;
    response: Response;
    summary: string;
    tags: Array<string>;
    'x-order': string;
}

export type Get = {
    deprecated: boolean;
    description: string;
    operationId: string;
    parameters: Array<Parameters>;
    produces: Array<string>;
    response: Response;
    summary: string;
    tags: Array<string>;
}

export type Path = {
    post?: Post;
    get?: Get;
}

export type Paths = {
    [key: string]: Path;
};

export type Tag = {
    description: string;
    tag: string;
}

export type ApiDocs = {
    basePath: string;
    definitions: Definitions;
    host: string;
    info: {
        contact: Contact;
        description: string;
        license: {
            name: string;
            url: string;
        };
        title: string;
        version: string;
    };
    paths: Paths;
    securityDefinitions: { // 安全相关
        [k: string]: { // 比如 '令牌'
            in: string; // 在'header'中（在请求头中）
            name: string; // header中的令牌名称，比如'Authorization'
            type: string; // 'apiKey'
        }
    }
    swagger: string; // swagger版本
    tags: Array<Tag>;
}

export interface ApiDocsResponse extends AxiosResponse<ApiDocs> {

}