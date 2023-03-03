import AxiosRequest from '@/core/AxiosRequest';
import { ApiDocsResponse, ApiDocs, SwaggerResourceResponse, MircoApp } from 'types/api';

/**
 * @description 处理接口信息
 */
class ApiManage {
    swaggerResource: Array<MircoApp>;
    apiDocs: ApiDocs | undefined;
    constructor() {
        this.swaggerResource = [];
        this.apiDocs = undefined;
    }
    /**
     * @description 获取swaggerResources,从这个接口可以获取所有微应用基本信息
     */
    async getSwaggerResource() {
        let rootPath = this.getRootPath(false);
        if (!this.swaggerResource || !this.swaggerResource.length) {
            let origin = window.location.origin;
            let resourceUrl = `${origin}${rootPath}/swagger-resources`;
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
        if (group) {
            const api = new AxiosRequest(undefined, '');
            let url = window.location.origin + '/gateway' + group
            let res: ApiDocsResponse = await api.get(url);
            this.apiDocs = res.data;
            return this.apiDocs;
        } else {
            throw new Error('获取分组url/groupUrl失败')
        }
    }
    /**
     * 
     * @param {boolean} absolute true 返回绝对路径 false 放回相对路径
     * @returns 
     */
    getRootPath(absolute: boolean): string {
        const pathName = window.location.pathname.substring(1);
        const webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
        let result = '';
        if (webName == "") {
            result = window.location.host;
        }
        else {
            result = '/' + webName;
            
        }
        if (absolute) {
            return window.location.protocol + '//' + window.location.host + '/' + result;
        } else {
            return result;
        }
    }

    


}


const apiManage = new ApiManage();

export default apiManage