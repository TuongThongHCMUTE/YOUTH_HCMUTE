import axios from 'axios';
import { renderHttpRequestParams } from 'helpers/http';
import { getServer } from 'helpers/server';
import { getTokenFromStorage } from 'helpers/storage';

const url = getServer();

export const getYearsRequest = (args) => {
  const token = getTokenFromStorage();
  const params = renderHttpRequestParams({ ...args, defaultSortBy: 'maNamHoc' });

  return axios({
    method: 'get',
    url: `${url}/school-years`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  });
};

export const updateYearRequest = (data) => {
  const token = getTokenFromStorage();

  return axios({
    method: 'put',
    url: `${url}/school-years/${data.maNamHoc}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: data
  });
};

export const deleteYearRequest = (id) => {
  const token = getTokenFromStorage();
  
  return axios({
    method: 'delete',
    url: `${url}/school-years/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};