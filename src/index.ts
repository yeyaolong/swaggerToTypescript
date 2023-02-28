// import '@/css/index.less';
// import db from '@/core/storage';
import AxiosRequest from '@/core/AxiosRequest';
import apiManage from './core/ApiManage';
import Render from '@/core/render/index';
import jsonManager from '@/core/JSONManager';
import dispatchCenter from '@/core/DispatchCenter';
import fileManager from './core/FileManager';
import htmlDataManage from '@/core/HtmlDataManage';
import { ApiDocsResponse } from 'types/api';
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
    // regist();

    // 页面上注入扩展程序的icon 
    let render = new Render('app');
    render.initIcon();
    // 获取接口信息
    // getSwaggerResource();
}
/**
 * @description 事件注册
 */
// function regist() {
//     dispatchCenter.regist('getApiDocs', undefined, apiManage.getApiDocs);
//     dispatchCenter.regist('definitions2TSString', jsonManager, jsonManager.definitions2TSString);
//     dispatchCenter.regist('exportFile', fileManager, fileManager.createFiles)
// }

// async function getApiDocs(group: string) {
//     if (group) {
//         let data = await apiManage.getApiDocs(group);
//         let result = jsonManager.definitions2TSString(data.definitions);
//         console.log('index getApiDocs', data, result)
//         return result;
//     } else {
//         throw new Error('获取分组url/groupUrl失败')
//     }

// }


init();

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    htmlDataManage.getHomeHtml();
    let group = htmlDataManage.getGroupUrl();
    let data = await apiManage.getApiDocs(group);
    const bathPath = data.basePath;
    console.log('data', data, bathPath);
    // 触发获取接口信息事件
    
    // dispatchCenter.dispatchEvent('exportFile', {name: '测试.ts', data: data[0]});
    console.log('chrome.runtime.onMessage', request, sender, sendResponse);
    sendResponse('content收到收到');
})