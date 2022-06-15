// Node Modules ============================================================ //
import axios from "axios";
// Constants =============================================================== //
import { url } from 'store/constant';
const token = sessionStorage.getItem("token");

export const getComments = (args) => {
    const { limit, offset, hoatDong } = args;

    const params = {
        offset: offset ? offset : 0,
        hoatDong: hoatDong,
    }

    if (limit) {
        params.limit = limit;
    }

    const option = {
        method: 'get',
        url: `${url}/comments`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    }

    return axios(option)
}

export const createOneComment= (comment) => {
    const option = {
        method: "post",
        url: `${url}/comments`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: comment
    }
  
    return axios(option);
}