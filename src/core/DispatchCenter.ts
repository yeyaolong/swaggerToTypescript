/**
 * @description 订阅发布模式-调度中心
 * 允许对同一事件重复订阅，此时会执行多个处理方法
 * 
 */
class DispatchCenter {
    registerList: Array<{
        event: string;
        handler: Function;
    }>;
    constructor() {
        this.registerList = [];
    }
    /**
     * @description 订阅/事件注册，允许对同一事件重复订阅，此时会执行多个处理方法
     * @params event 事件名称
     * @params handler 事件处理方法
     */
    regist(event: string, handler: Function) {
        this.registerList.push({
            event,
            handler
        })
    }

    /**
     * @description 事件分发
     * @params event 事件名称
     * @params params 事件处理方法参数
     */
    dispatchEvent(event: string, params: any) {
        let hasFunc = false; // 是否找到了对应的函数
        this.registerList.forEach((item) => {
            if (item.event === event && typeof item.handler === 'function') {
                hasFunc = true;
                if (typeof params === 'object') {
                    item.handler(...params);
                } else {
                    item.handler(params);
                }
                
            }
        });
        if (!hasFunc) {
            throw new Error('没有找到对应的处理方法')
        }
    }

    /**
     * @description 取消订阅
     */
    remove(event: string) {
        let cur = -1;
        this.registerList.forEach((item, index) => {
            if (item.event === event) {
                cur = index;
            }
        });
        if (cur >= 0) {
            this.registerList.splice(cur, 1);
        } else {
            throw new Error('取消订阅失败，未找到订阅内容')
        }
    }
}

const dispatchCenter = new DispatchCenter();

export default dispatchCenter;