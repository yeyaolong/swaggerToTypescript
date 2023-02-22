/**
 * @description Storage数据管理
 */
class StorageManage {
    constructor() {}

    get(key: string, defaultValue: string): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get([key]).then((result) => {
                if (result) {
                    resolve(result[key]);
                } else {
                    resolve(defaultValue);
                }
            })
        })
    }

    set(key: string, value: any): void {
        let params: any = {}
        params[key] = value;
        chrome.storage.local.set(params).then(() => {
            console.log('存储成功', key, value);
        })
    }
}

const db = new StorageManage();

export default db;

export {
    StorageManage
}