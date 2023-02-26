// JSON数据来自 http://10.50.23.68:40820/gateway/shuhan-enterprise-service/v2/api-docs?group=企业接口后台

class JSONManager {
    
    constructor() {

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
                result += this.definition2TSString(tmp) + '\r\n';
            }
        }
        return result;
    }
    /**
     * @description 将definition转化为ts字符串
     * @param definitions 
     */
    definition2TSString(definition: Definition): string {
        let title = definition.title.replaceAll('integer', 'number')
                                    .replaceAll('int', 'number')
                                    .replaceAll('«', '<').replaceAll('»', '>');
        let result = `export type ${title} = {`;
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
                type = `Array<${tmp.items?.originalRef}>`;
            }
            else if (tmp.originalRef) {
                // 对象
                type = tmp.originalRef.replaceAll('integer', 'number')
                                        .replaceAll('int', 'number')
                                        .replaceAll('«', '<').replaceAll('»', '>');
            }

            result += `\r\n\t${key}: ${type}; // ${tmp.description ? tmp.description : ''} ${tmp.format ? tmp.format : ''}`;


            
        }
        result += '\r\n}';
        // console.log('definition2TSString', result);
        return result;
    }
}

const jsonManager = new JSONManager();

export default jsonManager