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
        let mainDom = document.querySelector('.ant-tabs-content')?.querySelector('main');
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
            })
            
        }

        console.log('getHomeHtml', this.homeData);

    }

    /**
     * 获取分组URL
     */
    getGroupUrl() {
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
}

export default HtmlDataMange