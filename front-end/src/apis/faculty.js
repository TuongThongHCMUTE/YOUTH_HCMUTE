// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

export const getAllFaculties = (args) => {
    const token = sessionStorage.getItem("token");
    const { hienThi } = args;

    const params = {
        sortBy: 'thuTu',
    };

    if (hienThi === true || hienThi === false) {
        params.hienThi = hienThi;
    }

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
    const token = sessionStorage.getItem("token");
    const option = {
        method: 'get',
        url: `${url}/faculties/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios(option)
}