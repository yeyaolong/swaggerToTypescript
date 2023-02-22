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
          
              // headers.tenant = db.get('TENANT', '')
            //   const clientId = import.meta.env.VITE_APP_CLIENT_ID
            //   const clientSecret = import.meta.env.VUE_APP_CLIENT_SECRET
            //   headers['Sh-Client'] = `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`
              return config
            },
            (error: Error) => Promise.reject(error)
          )
    }
    // 初始化响应拦截器
    initResponseInterceptors() {}

    get(data: any, url: string) {
        this.axios({
            method: 'GET',
            url,
            data: data
        });
    }

    post() {}

    put() {}

    delete() {}

    handleError(error: Error, reject: Function, opts: any) {}

    handleSuccess(res: AxiosResponse<ApiInterface>, resolve: Function, opts: any) {}

}


export default AxiosRequest