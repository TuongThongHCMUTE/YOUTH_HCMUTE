// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

const token = sessionStorage.getItem("token");

export const getAllManagers= (args) => {
    const { limit, offset, sortBy, isDescending, email, faculty, role, status } = args;

    const params = {
        offset: offset ? offset : 0,
        sortBy: sortBy ? sortBy : 'email',
        role: role,
    }

    if (limit) {
        params.limit = limit;
    }

    if (faculty && faculty !== 'all') {
        params.donVi = faculty;
    }

    if (status !== undefined && status !== 'all') {
        params.trangThai = status;
    }

    if (email) {
        params.email = email;
    }

    params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy; 

    const option = {
        method: 'get',
        url: `${url}/managers`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    }

    return axios(option)
}

export const getOneManagerById = (id) => {
    const option = {
        method: 'get',
        url: `${url}/managers/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios(option);
}

export const createOneManager = (manager) => {
    const option = {
        method: "post",
        url: `${url}/managers`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: manager
    }
  
    return axios(option);
}

export const updateOneManager = ({ password, ...manager }) => {
    const option = {
        method: "put",
        url: `${url}/managers/${manager._id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: manager
    }
  
    return axios(option);
}

export const resetManagerPassword = (email, password) => {
    const option = {
        method: "put",
        url: `${url}/auth/cap-mat-khau`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { email, password }
    }
  
    return axios(option);
}

export const deleteManager = (id) => {
    const option = {
        method: "delete",
        url: `${url}/managers/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
}