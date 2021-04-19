import axios from 'axios'
export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
            baseURL: 'http://152.136.185.210:7878/api/m5',
            timeout: 5000
        })
        //2.实现数据拦截
    instance.interceptors.request.use(config => {
        // console.log(config);
        //拦截数据进行处理后再return出去
        return config
    }, err => {
        console.log(err);
    })
    instance.interceptors.response.use(res => {
            return res.data
        }, err => {
            console.log(err);
        })
        //3.发送真正网络请求
    return instance(config)
}