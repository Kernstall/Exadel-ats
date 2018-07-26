import axios from 'axios';

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
  }).then(response => saveTokenData(response.data));
};

export const makeRequest = (url, config) => {
  return axios({
    data: config.data,
    params: config.params,
    method: config.method,
    url,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
  });
};
