import axios, { post } from 'axios';
import { API_URL, TIME_OUT } from './../../config/api';

export const apiUserData = (id) => (
  axios({
    method: 'get',
    url: `${API_URL}/user/${id}`,
    timeout: TIME_OUT
  })
);

export const apiUserUpdate = (data) => (
  axios({
    method: 'put',
    url: `${API_URL}/user/${data.id}`,
    data,
    timeout: TIME_OUT
  })
);

export const apiUserChangePass = (data) => (
  axios({
    method: 'post',
    url: `${API_URL}/user/change-password`,
    data: {
      email: data.email,
      password: data.password,
      newpassword: data.newpassword
    },
    timeout: TIME_OUT
  })
);

export const apiUserImageUpload = (file) => {
  const url = `${API_URL}/user/upload`;
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return post(url, formData, config);
};

