import Axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import db from '@/core/Storage';

class AxiosRequest {
    axios: any;
    config: AxiosRequestConfig;
    token: string;

    constructor(config: AxiosRequestConfig | undefined | null, token: string) {
        this.token = token;
        if (!config) {
            this.config = {
                baseURL: 'http://10.50.23.68:40820/gateway',
                timeout: 3000,
                headers: {

                }
            }
        } else {
            this.config = config;
        }
        this.axios = Axios.create(this.config);
        this.initRequestInterceptors();
        this.initResponseInterceptors();
    }
    // 初始化请求拦截器
    initRequestInterceptors() {
        this.axios.interceptors.request.use(
            (config: AxiosRequestConfig) => {
              const { headers = {} } = config
              const isToken = headers['X-isToken'] === false ? headers['X-isToken'] : true
              const token = db.get('TOKEN', '')
              if (token && isToken) {
                headers.Authorization = 'Bearer ' + token
              }
              return config
            },
            (error: Error) => Promise.reject(error)
          )
    }
    // 初始化响应拦截器
    initResponseInterceptors() {
        this.axios.interceptors.response.use(
            (response: any) => response,
            (error: Error) => Promise.reject(error)
          )
    }

    get(url: string, data?: any): Promise<AxiosResponse>  {
        return new Promise((resolve, reject) => {
            this.axios({
                method: 'GET',
                url,
                data: data
            }).then((res: AxiosResponse) => {
                this.handleSuccess(res, resolve);
            });
        })
        
    }

    post() {}

    put() {}

    delete() {}

    handleError(error: Error, reject: Function) {}

    handleSuccess(res: AxiosResponse, resolve: Function) {
        if (res.data.code && res.data.code !== 200) {
            const loginErr = [401, 10004, 40001, 40002, 50001, 10002]
            if (loginErr.includes(res.data.code)) {
                alert('用户登录超时');
            }
        }
        resolve(res)
    }

}


export default AxiosRequest