// import '@/css/index.less';
// import db from '@/core/storage';
import AxiosRequest from '@/core/AxiosRequest';
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
    // htmlDataManage.getHomeHtml();
    // 事件注册
    regist();

    // 页面上注入扩展程序的icon 
    let render = new Render('app');
    render.initIcon();
    // 获取接口信息
    // getSwaggerResource();
}
/**
 * @description 事件注册
 */
function regist() {
    dispatchCenter.regist('getApiDocs', undefined, getApiDocs);
    dispatchCenter.regist('definitions2TSString', jsonManager, jsonManager.definitions2TSString);
    dispatchCenter.regist('exportFile', fileManager, fileManager.createFiles)
}

async function getApiDocs() {
    htmlDataManage.getHomeHtml();
    let group = htmlDataManage.getGroupUrl();
    const api = new AxiosRequest(undefined, '');
    let url = window.location.origin + '/gateway' + group
    let res: ApiDocsResponse = await api.get(url);
    let data = dispatchCenter.dispatchEvent('definitions2TSString', res.data.definitions);
    return data;
    
}


init();

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    // htmlDataManage.getHomeHtml();
    // 触发获取接口信息事件
    // let data = await dispatchCenter.dispatchEvent('getApiDocs');
    // dispatchCenter.dispatchEvent('exportFile', {name: '测试.ts', data: data[0]});
    sendResponse('content收到收到');
})