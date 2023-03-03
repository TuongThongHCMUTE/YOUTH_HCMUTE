import axios from 'axios';
import { getServer } from 'helpers/server';

const url = getServer();

export const getHomePageRequest = () => {
  const option = {
    method: 'get',
    url: `${url}/statistic/trang-chu`
  };

  return axios(option);
};
