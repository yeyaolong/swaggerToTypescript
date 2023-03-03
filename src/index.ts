import apiManage from './core/ApiManage';
import Render from '@/core/render/index';
import htmlDataManage from '@/core/HtmlDataManage';

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
    console.log('chrome.runtime.onMessage', request, sender, sendResponse);
    if (request.menuInfo && request.menuInfo.menuItemId === 'transformPage') {
        // 转化当前页的接口
        htmlDataManage.handleTransformPage();
    }
    if (request.menuInfo && request.menuInfo.menuItemId === 'transformSelection') {
        // 转化当前选中的接口
        htmlDataManage.handleTransformSelection(request.menuInfo);
    }

    // sendResponse('content收到收到');
});