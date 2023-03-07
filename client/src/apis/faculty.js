import axios from 'axios';
import { getServer } from 'helpers/server';
import { getTokenFromStorage } from 'helpers/storage';
import { renderHttpRequestParams } from 'helpers/http';

const url = getServer();

export const getFaculties = (...args) => {
  const token = getTokenFromStorage();
  const params = renderHttpRequestParams({ ...args, defaultSortBy: 'thuTu' });

  return axios({
    method: 'get',
    url: `${url}/faculties`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params
  });
};
