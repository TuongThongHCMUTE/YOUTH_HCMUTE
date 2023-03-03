import axios from 'axios';
import _ from 'lodash';
import { getServer } from 'helpers/server';
import { getTokenFromStorage } from 'helpers/storage';

const url = getServer();

export const getFaculties = (...args) => {
  const token = getTokenFromStorage();
  const { hienThi } = args;

  return axios({
    method: 'get',
    url: `${url}/faculties`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      hienThi: _.isBoolean(hienThi) ? hienThi : null,
    },
  });
};
