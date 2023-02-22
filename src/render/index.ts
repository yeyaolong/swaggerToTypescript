import './index.less';
import HtmlDataManage from '@/core/HtmlDataManage';
class Render {
    container: HTMLBodyElement | HTMLDivElement | HTMLElement | null;
    htmlDataManage = new HtmlDataManage();
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
            this.htmlDataManage.getHomeHtml();
            this.htmlDataManage.getGroupUrl();
        });

        if (this.container) {
            this.container.appendChild(iconContainer);
        }
    }
}


export default Render