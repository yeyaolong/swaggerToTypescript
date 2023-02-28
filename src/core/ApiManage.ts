import AxiosRequest from '@/core/AxiosRequest';
import { ApiDocsResponse } from 'types/api';
import dispatchCenter from '@/core/DispatchCenter';

/**
 * @description 处理接口信息
 */
class ApiManage {
    constructor() {}
    /**
     * @description 调用 /gateway/v2/api-docs?group=xxx 接口
     * 获取当前分组url的微应用所有接口信息
     */
    async getApiDocs(group: string) {
        // let data;
        if (group) {
            const api = new AxiosRequest(undefined, '');
            let url = window.location.origin + '/gateway' + group
            let res: ApiDocsResponse = await api.get(url);
            console.log('apimanage getApiDocs', res)
            return res.data;
        } else {
            throw new Error('获取分组url/groupUrl失败')
        }
    }

    


}


const apiManage = new ApiManage();

export default apiManage