import AxiosRequest from '@/core/AxiosRequest';
import { ApiDocsResponse, ApiDocs, SwaggerResourceResponse, SwaggerUIConfigResponse, SwaggerUIConfig, MircoApp } from 'types/api';

/**
 * @description 处理接口信息
 */
class ApiManage {
    swaggerResource: Array<MircoApp>;
    swaggerUIConfig: SwaggerUIConfig | undefined;
    apiDocs: ApiDocs | undefined;
    constructor() {
        this.swaggerUIConfig = undefined;
        this.swaggerResource = [];
        this.apiDocs = undefined;
    }
    /**
     * @description 获取swagger-ui渲染ui相关信息
     * 涉及到对HTML页面DOM节点的解析方式
     */
    async getSwaggerUIConfig() {
        let rootPath = this.getRootPath(false);
        const origin = window.location.origin;
        let api = new AxiosRequest(undefined, '');
        let url = ''
        if (rootPath) {
            url = `${origin}/${rootPath}/swagger-resources/configuration/ui`;
        } else {
            url = `${origin}/swagger-resources/configuration/ui`
        }
        
        let res: SwaggerUIConfigResponse = await api.get(url);
        this.swaggerUIConfig = res.data;
        
        return this.swaggerUIConfig;
    }
    /**
     * @description 获取swaggerResources,从这个接口可以获取所有微应用基本信息
     */
    async getSwaggerResource() {
        let rootPath = this.getRootPath(false);
        
        if (!this.swaggerResource || !this.swaggerResource.length) {
            const origin = window.location.origin;
            let resourceUrl = '';
            if (rootPath) {
                resourceUrl = `${origin}/${rootPath}/swagger-resources`;
            } else {
                resourceUrl = `${origin}/swagger-resources`;
            }
            
            let api = new AxiosRequest(undefined, '');
            let res: SwaggerResourceResponse = await api.get(resourceUrl);
            this.swaggerResource = res.data;
        }
        

        return this.swaggerResource;
    }
    /**
     * @description 调用 /gateway/v2/api-docs?group=xxx 接口
     * 获取当前分组url的微应用所有接口信息
     */
    async getApiDocs(group: string) {
        if (typeof group === 'string') {
            const api = new AxiosRequest(undefined, '');
            const rootPath = this.getRootPath(false);
            const origin  = window.location.origin;
            let url = '';
            if (rootPath) {
                url = `${origin}/${rootPath}${group}`
            } else {
                url = `${origin}${group}`
            }
            
            let res: ApiDocsResponse = await api.get(url);
            this.apiDocs = res.data;
            return this.apiDocs;
        } else {
            throw new Error('获取分组url/groupUrl失败')
        }
    }
    /**
     * 
     * @param {boolean} absolute true 返回绝对路径 false 返回相对路径
     * @returns 
     */
    getRootPath(absolute: boolean): string {
        const pathName = window.location.pathname.substring(1);
        const webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
        let result = webName;
        if (absolute) {
            return window.location.protocol + '//' + window.location.host + '/' + result;
        } else {
            return result;
        }
    }

    


}


const apiManage = new ApiManage();

export default apiManage