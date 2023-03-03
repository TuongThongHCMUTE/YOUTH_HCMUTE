import axios from 'axios';
import { renderHttpRequestParams } from 'helpers/http';
import { getServer } from 'helpers/server';
import { getTokenFromStorage } from 'helpers/storage';

const url = getServer();

export const getClasses = (args) => {
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