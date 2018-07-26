import axios from 'axios';

const restoreSession = () => {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) {
    return Promise.reject();
  }
  return axios.post('/api/token/refresh', { refresh_token })
    .then(response => {
      if (!response.error && response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }
    });
};

axios.interceptors.response.use(response => response, error => {
  const requestConfig = error.config;
  if (!requestConfig._loading && error.response.status === 401) {
    requestConfig._loading = true;
    return restoreSession().then(() => {
      return axios({
        ...requestConfig,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
    }).catch(() => {
      localStorage.clear();
      window.location.href = '/';
    });
  }
  return Promise.reject(error);
});

const saveTokenData = (data) => {
  if (data) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  }
};

export const login = (username, password) => {
  return axios.post('/api/user/login', {
    username,
    password,
  }).then(res => {console.log(res); return res; }).then(response => saveTokenData(response.data));
};

export const makeRequest = (url, config) => {
  return axios({
    data: config.data,
    params: config.params,
    method: config.method,
    url,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};
