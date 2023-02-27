import './index.less';
import htmlDataManage from '@/core/HtmlDataManage';

import dispatchCenter from '@/core/DispatchCenter';
class Render {
    container: HTMLBodyElement | HTMLDivElement | HTMLElement | null;
    constructor(containerId: string) {
        let tempContainer = document.querySelector('#' + containerId) as HTMLElement;
        if (tempContainer) {
            this.container = tempContainer;
        } else {
            this.container = document.querySelector('body');
        }
    }

    initIcon() {
        let iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';

        iconContainer.addEventListener('click', () => {
            htmlDataManage.getHomeHtml();
            let groupUrl = htmlDataManage.getGroupUrl();
            // 触发获取接口信息事件
            dispatchCenter.dispatchEvent('getApiDocs')
        });

        if (this.container) {
            this.container.appendChild(iconContainer);
        }
    }
}


export default Render