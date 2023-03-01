// import apiManage from './core/ApiManage';
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
     * 读取主页html
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
     * 获取分组URL
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
            throw new Error('获取当前api url失败');
        }

    }
}

const htmlDataManage = new HtmlDataMange();

export default htmlDataManage