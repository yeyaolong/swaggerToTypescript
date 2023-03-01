
import apiManage from './core/ApiManage';
import Render from '@/core/render/index';
import htmlDataManage from '@/core/HtmlDataManage';
import { MircoApp, Path, PostInfo, GetInfo } from '#/api';
import jsonManager from './core/JSONManager';
import fileManager from './core/FileManager';
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
    let originalRef = '';
    swaggerResouce.forEach((item: MircoApp) => {
        if (item.name === currentMicroApp) {
            groupUrl = item.url;
            
        }
    });
    if (groupUrl) {
        const apiDocs = await apiManage.getApiDocs(groupUrl);
        basePath = apiDocs.basePath;
        const paths = apiDocs.paths;
        const definitions = apiDocs.definitions;
        let apiUrl = htmlDataManage.getSpcifyApiUrl();
        apiUrl = apiUrl.replace(basePath, '');
        let pathInfo: Path = jsonManager.getSpcifyApiUrlInfo(apiUrl, paths);
        console.log('apiUrl', basePath, apiUrl, pathInfo);
        
        if (pathInfo && pathInfo.get) {
            const methodInfo: GetInfo = pathInfo.get;
            if (methodInfo.responses['200'] && methodInfo.responses['200'].schema) {
                originalRef = methodInfo.responses['200'].schema.originalRef;
            } else {
                throw new Error('Get 方法解析originalRef 异常')
            }
        }

        if (pathInfo && pathInfo.post) {
            const methodInfo: PostInfo = pathInfo.post;
            if (methodInfo.responses['200'] && methodInfo.responses['200'].schema) {
                originalRef = methodInfo.responses['200'].schema.originalRef;
            } else {
                throw new Error('Post 方法解析originalRef 异常')
            }
        }
        

        let definition = definitions[originalRef];
        let result = '';
        result += jsonManager.definition2TSString(definition, true);
        // 利用上一次转化生成的对象缓存，再做一次转化
        if (jsonManager.unprocessedCache && jsonManager.unprocessedCache.length) {
            // const len = jsonManager.processedCache.length;
            // for (let i = 0; i < jsonManager.unprocessedCache.length; i++) {
                // 这里不写i++，因为jsonManager.unprocessedCache会慢慢减小
            for (let i = 0; i < jsonManager.unprocessedCache.length;) {
                let ref: string = jsonManager.unprocessedCache.pop() as string;
                console.log('ref', ref);
                result+= jsonManager.definition2TSString(definitions[ref], true)
                jsonManager.processedCache.push(ref);
                console.log('jsonManager.unprocessedCache', jsonManager.unprocessedCache.length, jsonManager.unprocessedCache)
            }
        }
        // 转化完成，缓存重置
        jsonManager.processedCache = [];
        jsonManager.unprocessedCache = [];

        fileManager.createFiles({name: '测试.ts', data: result})
    }
    sendResponse('content收到收到');
})