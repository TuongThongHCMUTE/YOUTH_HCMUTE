// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

const token = sessionStorage.getItem("token");

export const getAllFaculties = () => {
    const option = {
        method: 'get',
        url: `${url}/faculties`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: { sortBy: 'thuTu'}
    }

    return axios(option)
}

export const getFacultyById = (id) => {
    const option = {
        method: 'get',
        url: `${url}/faculties/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios(option)
}