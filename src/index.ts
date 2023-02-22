// import '@/css/index.less';
// import db from '@/core/storage';
import AxiosRequest from '@/core/AxiosRequest';
import Render from '@/render/index';

class Main {
    api: AxiosRequest;
    url: string; // swagger请求地址
    group: string; // swagger请求的组
    token: string;
    constructor(url: string, group: string, token: string) {
        this.url = url;
        this.group = group;
        this.token = token;
        this.api = new AxiosRequest(undefined, token);
    }
    async initData() {
        let params = {
            group: this.group
        }
        let res = await this.api.get(params, this.url);
    }
    /**
     * @description 初始化悬浮窗
     */
    initFloatWindow() {

    }
}

/**
 * @description 获取swaggerResources
 */
async function getSwaggerResource() {
    let origin = window.location.origin;
    let resourceUrl = `${origin}/gateway/swagger-resources`;
    let api = new AxiosRequest(undefined, '');
    let res = await api.get(undefined, resourceUrl);
}
/**
 * @description 初始化
 */
function init() {
    // 页面上注入扩展程序的icon 
    let render = new Render('app');
    render.initIcon();
    // 获取接口信息
    getSwaggerResource();
}

init();



// http://10.50.23.68:40820/gateway/shuhan-enterprise-service/v2/api-docs?group=企业接口后台
