import axios from 'axios';
import { getServer } from 'helpers/server';
import { getTokenFromStorage } from 'helpers/storage';

const url = getServer();

export const loginRequest = data => {
  const option = {
    method: 'post',
    url: `${url}/auth/dang-nhap`,
    data: data
  };
  return axios(option);
};

export const googleLoginRequest = data => {
  const option = {
    method: 'post',
    url: `${url}/auth/dang-nhap-google`,
    data: data
  };
  return axios(option);
};

export const getCurrentUserRequest = () => {
  const token = getTokenFromStorage();
  const option = {
    method: 'get',
    url: `${url}/auth/ca-nhan`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios(option);
};

export const resetPasswordRequest = data => {
  const option = {
    method: 'put',
    url: `${url}/auth/cap-lai-mat-khau`,
    data: data
  };
  return axios(option);
};
