// JSON数据来自 http://10.50.23.68:40820/gateway/shuhan-enterprise-service/v2/api-docs?group=企业接口后台

import { type Paths } from "#/api";

class JSONManager {
    processedCache: Array<string>; // 已处理的对象
    unprocessedCache: Array<string>; // 待处理的对象
    constructor() {
        this.processedCache = [];
        this.unprocessedCache = [];
    }

    
    /**
     * @description 从JSON中获取指定接口的基本信息
     */
    getSpcifyApiUrlInfo(url: string, paths: Paths) {
        return paths[url];
    }
    /**
     * @description 批量 将definitions转化为ts字符串
     * @param definitions 
     */
    definitions2TSString(definitions: Definitions): string {
        let result = '';
        if (definitions && Object.keys(definitions).length) {
            for (let key in definitions) {
                let tmp = definitions[key];
                result += this.definition2TSString(key, tmp);
            }
        }
        return result;
    }
    /**
     * @description 将definition转化为ts字符串
     * 默认不做递归，只有一层，所以如果是对象类型的话，就不好用了
     * 但是可以给 definitions2TSString 调用
     * 因为 definitions 数组里面已经包含了所有对象,不需要做递归
     * @param key 变量名 当definition中不含title信息时，就用key做变量名
     * @param definitions 
     * @param {boolean} cacheFlag true 启用对象缓存 false 不启用
     */
    definition2TSString(key: string, definition: Definition, cacheFlag: boolean = false): string {
        console.log('definition2TSString', definition, cacheFlag);
        let title = key;
        if (definition.title) {
            title = definition.title
        }
        title = title.replaceAll('integer', 'number')
                    .replaceAll('int', 'number')
                    .replaceAll('«', '<').replaceAll('»', '>');
        
        let result = `// ${definition.description ? definition.description : ''}\r\n`
        result += `export type ${title} = {`;
        for (let key in definition.properties) {
            let tmp = definition.properties[key];
            let type = '';

            if (tmp.type && tmp.type !== 'array') {
                // 基本数据类型
                type = tmp.type.replaceAll('integer', 'number')
                                .replaceAll('int', 'number');
            }
            else if (tmp.type === 'array') {
                // 数组
                let originalRef = tmp.items?.originalRef;
                const ref = tmp.items?.$ref;
                if (ref) {
                    let refArr = ref.split('/');
                    const len = refArr.length;
                    originalRef = refArr[len-1];
                }
                
                type = `Array<${originalRef}>`;
                console.log('definition2TSString 数组1', cacheFlag, tmp.items);
                if (cacheFlag && originalRef && !this.processedCache.includes(originalRef)) {
                    // 启用对象缓存，并且这个对象没有被处理过
                    console.log('definition2TSString 数组2', cacheFlag, tmp.items);
                    this.unprocessedCache.unshift(originalRef);
                    
                }
            }
            else if (tmp.originalRef || tmp.$ref) {
                // 对象
                let originalRef = tmp?.originalRef;
                const ref = tmp?.$ref;
                if (ref) {
                    let refArr = ref.split('/');
                    const len = refArr.length;
                    originalRef = refArr[len-1];
                }
                if (originalRef) {
                    type = originalRef.replaceAll('integer', 'number')
                                        .replaceAll('int', 'number')
                                        .replaceAll('«', '<').replaceAll('»', '>');
                    console.log('definition2TSString 对象', cacheFlag, this.processedCache.includes(originalRef));
                    if (cacheFlag && !this.processedCache.includes(originalRef)) {
                        // 启用对象缓存，并且这个对象没有被处理过
                        this.unprocessedCache.unshift(originalRef);
                    }
                }
                
            }

            result += `\r\n\t${key}: ${type}; // ${tmp.description ? tmp.description : ''} ${tmp.format ? tmp.format : ''}`;
        }
        result += '\r\n}\r\n';
        return result;
    }


}

const jsonManager = new JSONManager();

export default jsonManager;