import axios from 'axios';
import { renderHttpRequestParams } from 'helpers/http';
import { getServer } from 'helpers/server';
import { getTokenFromStorage } from 'helpers/storage';

const url = getServer();

export const getClassesRequest = (args) => {
  const token = getTokenFromStorage();
  const params = renderHttpRequestParams({ ...args, defaultSortBy: 'tenLop' });

  return axios({
    method: 'get',
    url: `${url}/classes`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  });
};

export const updateClassRequest = (data) => {
  const token = getTokenFromStorage();

  return axios({
    method: 'put',
    url: `${url}/classes/${data._id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: data
  });
};

export const deleteClassRequest = (id) => {
  const token = getTokenFromStorage();
  
  return axios({
    method: 'delete',
    url: `${url}/classes/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};