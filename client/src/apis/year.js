import axios from 'axios';
import { renderHttpRequestParams } from 'helpers/http';
import { getServer } from 'helpers/server';
import { getTokenFromStorage } from 'helpers/storage';

const url = getServer();

export const getYears = (args) => {
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