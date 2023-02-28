import './index.less';
import htmlDataManage from '@/core/HtmlDataManage';
import dispatchCenter from '@/core/DispatchCenter';
import jsonManager from '@/core/JSONManager';
import apiManage from '@/core/ApiManage';
import fileManager from '@/core/FileManager';

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

        iconContainer.addEventListener('click', async () => {
            // 触发获取接口信息事件
            htmlDataManage.getHomeHtml();
            let group = htmlDataManage.getGroupUrl();
            let data = await apiManage.getApiDocs(group);
            let result = jsonManager.definitions2TSString(data.definitions);
            fileManager.createFiles({name: '测试.ts', data: result})
        });

        if (this.container) {
            this.container.appendChild(iconContainer);
        }
    }
}


export default Render