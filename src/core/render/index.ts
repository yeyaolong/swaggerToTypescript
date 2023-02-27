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

        iconContainer.addEventListener('click', async () => {
            // 触发获取接口信息事件
            let data = await dispatchCenter.dispatchEvent('getApiDocs');
            dispatchCenter.dispatchEvent('exportFile', {name: '测试.ts', data: data[0]});
        });

        if (this.container) {
            this.container.appendChild(iconContainer);
        }
    }
}


export default Render