import axios from 'axios';
import { toast } from 'react-toastify';
import logService from './logService';
import authSevice from './authService';

axios.defaults.headers.common['x-auth-token'] = authSevice.getJwt();

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
  
    if (!expectedError) {
        toast.error("An unexpected error occurred");
        logService.log(error);
    }
    
    return Promise.reject(error);    
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};