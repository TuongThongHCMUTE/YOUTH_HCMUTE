import axios from "axios";
import { getServer } from "helpers/server";

const url = getServer();

export const getHomePageStatistic = () => {
  const option = {
    method: "get",
    url: `${url}/statistic/trang-chu`,
  };

  return axios(option);
};
