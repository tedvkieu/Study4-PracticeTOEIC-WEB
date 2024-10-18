import axios from 'axios';
//import nProgress from 'nprogress';
import NProgress from 'nprogress';

import { store } from '../redux/store';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
});

// const checkTokenExpiration = (token) => {
//     const decodedToken = jwt.decode(token);
//     if (decodedToken.exp * 1000 < Date.now()) {
//         // Token đã hết hạn
//         localStorage.removeItem('token'); // Hoặc Redux dispatch để xóa token
//         window.location.href = '/login'; // Điều hướng người dùng đến trang đăng nhập
//     }
// };

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        const access_token = store?.getState()?.user?.account?.access_token;
        config.headers['Authorization'] = 'Bearer ' + access_token;
        NProgress.start();
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        NProgress.done();
        console.log('instanceptor: >>>', response);
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response && response.data ? response.data : response;
    },
    function (error) {
        NProgress.done();
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error && error.response && error.response.data
            ? error.response.data
            : Promise.reject(error);
    }
);
export default instance;
