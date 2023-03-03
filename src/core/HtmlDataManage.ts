import apiManage from './ApiManage';
import jsonManager from './JSONManager';
import fileManager from './FileManager';
import type { MircoApp, Path, PostInfo, GetInfo, DeleteInfo } from '#/api';

/**
 * @description 通过html元素获取数据
 */
class HtmlDataMange {
    homeData: HomeData;
    constructor() {
        this.homeData = {
            title: '',
            info: []
        };
    }
    /**
     * @descriptioin 从页面上获取当前选中的微应用
     */
    getCurrentMicroApp(): string {
        let result = '';
        const currentSelectedDom = document.querySelector('.ant-select-selection-selected-value')
        if (currentSelectedDom) {
            result = currentSelectedDom.textContent ? currentSelectedDom.textContent : '';
        } else {
            throw new Error('页面上获取当前选中的微应用异常')
        }
        return result;
    }

    /**
     * @description 读取主页html
     */
    getHomeHtml() {
        this.homeData = {
            title: '',
            info: []
        };
        // let mainDom = document.querySelector('.ant-tabs-content')?.querySelector('.ant-tabs-tabpane-active')?.querySelector('main')?.querySelector('.description');
        // 因为主页始终是第一个tab，并且无法关闭首页只会隐藏，所以下面这个方法可以直接读取到主页的获取信息
        let mainDom = document.querySelector('.ant-tabs-content')?.querySelector('.ant-tabs-tabpane')?.querySelector('main')?.querySelector('.description');
        if (mainDom) {
            let title = mainDom.querySelector('h2')?.textContent;
            this.homeData.title = title ? title : '';

            let contentLineList = mainDom.querySelectorAll('.content-line.ant-row');
            contentLineList.forEach((item) => {
                let label = (item as HTMLDivElement).querySelector('h3')?.textContent;
                let value = (item as HTMLDivElement).querySelector('span')?.textContent;
                this.homeData.info.push({
                    label,
                    value
                });
            });
            
        } else {
            alert('获取主页信息异常')
        }

    }

    /**
     * @description 从homeData数据中获取分组URL
     * 不过，因为homeData是通过分析主页html节点获得的，兼容性很差
     * 建议直接使用getGroupUrl2，从接口获取分组url
     */
    getGroupUrl(): string {
        let result = '';
        if (this.homeData) {
            this.homeData.info.forEach((item) => {
                if (item.label === '分组Url') {
                    result = item.value ? item.value : '';
                }
            })
        }
        return result;
    }
    /**
     * @description 获取分组url
     */
    async getGroupUrl2(): Promise<string> {
        let result = '';
        const currentMicroApp = htmlDataManage.getCurrentMicroApp();
        let swaggerResouce = await apiManage.swaggerResource;
        swaggerResouce.forEach((item: MircoApp) => {
            if (item.name === currentMicroApp) {
                result = item.url;
            }
        });
        return result;
    }
    /**
     * @description 获取指定API url
     * 在页面上右键选择解析，获取当前API的url
     * @return { string } 返回url字符串
     */
    getSpcifyApiUrl(): string {
        // 获取当前活动的tab
        let activeTabDom = document.querySelector('.ant-tabs-card-content > .ant-tabs-tabpane-active');
        let result = '';
        if (activeTabDom) {
            let summaryPathDom = activeTabDom.querySelector('.knife4j-api-summary-path');
            if (summaryPathDom) {
                result = summaryPathDom.textContent ? summaryPathDom.textContent : '';
            }
        }
        if (result) {
            return result;
        } else {
            throw new Error('获取当前页面api url失败');
        }

    }
    /**
     * @description 转化当前页的接口
     */
    async handleTransformPage() {
        const apiUrlParam = this.getSpcifyApiUrl();
        console.log('handleTransformPage apiUrlParam', apiUrlParam)
        this.handleTransform(apiUrlParam);
    }
    /**
     * @description 转化当前选中的接口
     */
    async handleTransformSelection(menuInfo: ChromeCustom.request.menuInfo) {
        
        if (menuInfo.selectionText) {
            const selectionText = menuInfo.selectionText;
            this.handleTransform(selectionText);
        } else {
            throw new Error('转化当前选中的接口异常：获取用户选中内容失败')
        }        
    }
    /**
     * @description 转化接口
     */
    async handleTransform(apiUrlParam: string) {
        
        let groupUrl = await this.getGroupUrl2();
        let basePath = '';
        let originalRef = '';
        if (groupUrl) {
            const apiDocs = await apiManage.getApiDocs(groupUrl);
            basePath = apiDocs.basePath;
            const paths = apiDocs.paths;
            const definitions = apiDocs.definitions;
            
            let apiUrl = apiUrlParam.replace(basePath, '');

            let pathInfo: Path = jsonManager.getSpcifyApiUrlInfo(apiUrl, paths);
            console.log('apiUrl', basePath, apiUrl, pathInfo);
            
            if (pathInfo && pathInfo.get) {
                const methodInfo: GetInfo = pathInfo.get;
                if (methodInfo.responses['200'] && methodInfo.responses['200'].schema) {
                    originalRef = methodInfo.responses['200'].schema.originalRef;
                } else {
                    // 异常原因有可能是 这是一个 导出文件的方法，所以不会有数据结构
                    throw new Error('Get 方法解析 originalRef 异常')
                }
            }
    
            if (pathInfo && pathInfo.post) {
                const methodInfo: PostInfo = pathInfo.post;
                if (methodInfo.responses['200'] && methodInfo.responses['200'].schema) {
                    originalRef = methodInfo.responses['200'].schema.originalRef;
                } else {
                    // 异常原因有可能是 这是一个 导出文件的方法，所以不会有数据结构
                    throw new Error('Post 方法解析 originalRef 异常')
                }
            }
    
            if (pathInfo && pathInfo.delete) {
                const methodInfo: DeleteInfo = pathInfo.delete;
                if (methodInfo.responses['200'] && methodInfo.responses['200'].schema) {
                    originalRef = methodInfo.responses['200'].schema.originalRef;
                } else {
                    
                    throw new Error('Delete 方法解析 originalRef 异常')
                }
            }

            console.log('originRef', originalRef);
            
            if (!originalRef) {
                throw new Error(`获取originalRef异常，originalRef=${originalRef}`);
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
    }
}

const htmlDataManage = new HtmlDataMange();

export default htmlDataManage