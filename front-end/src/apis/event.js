// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

export const getAllEvents = (args) => {
    const token = sessionStorage.getItem("token");
    const { limit, offset, sortBy, isDescending, type, sinhVien } = args;

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

    if (sinhVien) {
        params['sinhViens.maSoSV'] = sinhVien.maSoSV
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
    const token = sessionStorage.getItem("token");
    const { limit, offset, sortBy, isDescending, searchString, type, sinhVien } = args;

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

    if (sinhVien) {
        params['sinhViens.maSoSV'] = sinhVien.maSoSV
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

export const getMissingEventsForSv5t = () => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: 'get',
        url: `${url}/events/hoat-dong-con-thieu`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios(option);
};

export const getAttendanceForSV5T = (args) => {
    const token = sessionStorage.getItem("token");
    const { limit, offset, sortBy, isDescending } = args;

    const params = {
        offset: offset ? offset : 0,
        sortBy: sortBy ? sortBy : 'createdAt',
    }

    if (limit) {
        params.limit = limit;
    }

    params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy;

    const option = {
        method: 'get',
        url: `${url}/events/tham-gia`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    }

    return axios(option);
}

export const getOneEventById = (id) => {
    const token = sessionStorage.getItem("token");
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
    const token = sessionStorage.getItem("token");
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
    const token = sessionStorage.getItem("token");
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
    const token = sessionStorage.getItem("token");
    const option = {
        method: "delete",
        url: `${url}/events/${eventId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
}

export const exportExcelAllEvents = () => {
    const token = sessionStorage.getItem("token");
    const headers = {'Content-Type': 'blob'};
    const option = {
        headers,
        method: 'get',
        responseType: 'arraybuffer',
        url: `${url}/events`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            xls: true,
        },
    }

    return axios(option)
}