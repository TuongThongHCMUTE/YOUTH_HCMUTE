// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

const token = sessionStorage.getItem("token");

export const getAllEvents = (args) => {
    const { limit, offset, sortBy, isDescending, type } = args;

    const params = {
        offset: offset ? offset : 0,
        sortBy: sortBy ? sortBy : 'createdAt',
    }

    if (limit) {
        params.limit = limit;
    }

    if (type && type !== 'type') {
        params.type = type;
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
    const { limit, offset, sortBy, isDescending, searchString, type } = args;

    const params = {
        offset: offset ? offset : 0,
        sortBy: sortBy ? sortBy : 'createdAt',
    }

    if (limit) {
        params.limit = limit;
    }

    if (type && type !== 'type') {
        params.type = type;
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

export const getOneEventById = (id) => {
    const option = {
        method: 'get',
        url: `${url}/events/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios(option);
}

export const createOneEvent = (event) => {
    const option = {
        method: "post",
        url: `${url}/events`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: event
    }
  
    return axios(option);
}

export const updateOneEvent = (event) => {
    const option = {
        method: "put",
        url: `${url}/events/${event._id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: event
    }
  
    return axios(option);
}

export const deleteEvent = (eventId) => {
    const option = {
        method: "delete",
        url: `${url}/events/${eventId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
}