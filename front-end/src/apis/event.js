// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

const token = sessionStorage.getItem("token");

export const getAllEvents = (args) => {
    const { limit, offset, sortBy, isDescending } = args;

    const params = {
        offset: offset ? offset : 0,
        sortBy: sortBy ? sortBy : 'email',
    }

    if (limit) {
        params.limit = limit;
    }

    params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy; 

    const option = {
        method: 'get',
        url: `${url}/events`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    }

    return axios(option)
}

export const searchEvents = (args) => {
    const { limit, offset, sortBy, isDescending, searchString } = args;

    const params = {
        offset: offset ? offset : 0,
        sortBy: sortBy ? sortBy : 'email',
    }

    if (limit) {
        params.limit = limit;
    }

    if (searchString) {
        params.searchString = searchString;
    }

    params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy; 

    const option = {
        method: 'get',
        url: `${url}/events/tim-kiem`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    }

    return axios(option)
}