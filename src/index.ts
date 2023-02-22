// import '@/css/index.less';
// import db from '@/core/storage';
import AxiosRequest from '@/core/AxiosRequest';
import Render from '@/render/index';
import jsonManager from '@/core/JSONManager';
import dispatchCenter from './core/DispatchCenter';


/**
 * @description 获取swaggerResources
 */
async function getSwaggerResource() {
    let origin = window.location.origin;
    let resourceUrl = `${origin}/gateway/swagger-resources`;
    let api = new AxiosRequest(undefined, '');
    let res = await api.get(resourceUrl);
}
/**
 * @description 初始化
 */
function init() {
    // 事件注册
    dispatchCenter.regist('getApiDocs', getApiDocs);
    dispatchCenter.regist('definitions2TS', jsonManager.definitions2TS);


    // 页面上注入扩展程序的icon 
    let render = new Render('app');
    render.initIcon();
    // // 获取接口信息
    // getSwaggerResource();
}

async function getApiDocs(group: string) {
    const api = new AxiosRequest(undefined, '');
    let url = window.location.origin + '/gateway' + group
    let res = await api.get(url);
    // dispatchCenter.dispatchEvent('definitions2TS')
}


init();



// http://10.50.23.68:40820/gateway/shuhan-enterprise-service/v2/api-docs?group=企业接口后台
