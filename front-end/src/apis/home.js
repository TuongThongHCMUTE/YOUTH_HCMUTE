// Node Modules ============================================================ //
import axios from "axios";
// Constants =============================================================== //
import { url } from 'store/constant';

export const getHomePageStatistic = () => {
    const option = {
        method: "get",
        url: `${url}/statistic/trang-chu`,
    }
  
    return axios(option);
}