import axios from 'axios';

const token = localStorage.getItem('jwtToken');
if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
}

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:3000/api/users/refreshToken', { refreshToken });
                const { token } = response.data;

                localStorage.setItem('jwtToken', token);
                axios.defaults.headers.common['Authorization'] = `${token}`;
                originalRequest.headers['Authorization'] = `${token}`;

                return axios(originalRequest);
            } catch (err) {
                console.error('Refresh token failed', err);
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('refreshToken');
            }
        }
        return Promise.reject(error);
    }
);

export default axios;
