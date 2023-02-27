/**
 * 通过html元素获取数据
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
     * 读取主页html
     */
    getHomeHtml() {
        this.homeData = {
            title: '',
            info: []
        };
        let mainDom = document.querySelector('.ant-tabs-content')?.querySelector('.ant-tabs-tabpane-active')?.querySelector('main')?.querySelector('.description');
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
     * @description 获取指定APIUrl
     * 在页面上右键选择解析，获取当前API的url
     */
    getSpcifyApiUrl() {
        // 获取当前活动的tab
        let activeTabDom = document.querySelector('.ant-tabs-tabpane-active');
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
            alert('获取API url失败');
        }

    }
}

const htmlDataManage = new HtmlDataMange();

export default htmlDataManage