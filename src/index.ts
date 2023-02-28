
import apiManage from './core/ApiManage';
import Render from '@/core/render/index';
import htmlDataManage from '@/core/HtmlDataManage';
import { MircoApp, Path } from '#/api';
import jsonManager from './core/JSONManager';

/**
 * @description 初始化
 */
async function init() {

    // 页面上注入扩展程序的icon 
    let render = new Render('app');
    render.initIcon();
    // 获取微应用基本信息
    await apiManage.getSwaggerResource();
}



init();

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const currentMicroApp = htmlDataManage.getCurrentMicroApp();

    let swaggerResouce = await apiManage.swaggerResource;
    let groupUrl = '';
    let basePath = '';
    swaggerResouce.forEach((item: MircoApp) => {
        if (item.name === currentMicroApp) {
            groupUrl = item.url;
            
        }
    });
    if (groupUrl) {
        const apiDocs = await apiManage.getApiDocs(groupUrl);
        basePath = apiDocs.basePath;
        const paths = apiDocs.paths;
        let apiUrl = htmlDataManage.getSpcifyApiUrl();
        apiUrl = apiUrl.replace(basePath, '');
        let pathInfo: Path = jsonManager.getSpcifyApiUrlInfo(apiUrl, paths);
        console.log('apiUrl', apiUrl, basePath, pathInfo);
        
    }
    
    // const bathPath = data.basePath;
    // console.log('data', data, bathPath);
    // 触发获取接口信息事件
    
    
    // dispatchCenter.dispatchEvent('exportFile', {name: '测试.ts', data: data[0]});
    // console.log('chrome.runtime.onMessage', request, sender, sendResponse);
    sendResponse('content收到收到');
})