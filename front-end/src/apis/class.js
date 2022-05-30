// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

const token = sessionStorage.getItem("token");

export const getAllClasses = (args) => {
    const { limit, offset, sortBy, isDescending, className, faculty } = args;

    const params = {
        offset: offset ? offset : 0,
        sortBy: sortBy ? sortBy : 'tenLop',
    }

    if (limit) {
        params.limit = limit;
    }

    if (className !== '') {
        params.tenLop = className;
    }

    if (faculty && faculty !== 'all') {
        params.donVi = faculty;
    }

    params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy; 

    const option = {
        method: 'get',
        url: `${url}/classes`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    }

    return axios(option)
}

export const exportExcelAllClasses = (args) => {
    const { limit, offset, sortBy, isDescending, className, faculty } = args;

    const params = {
        offset: offset ? offset : 0,
        sortBy: sortBy ? sortBy : 'tenLop',
    }

    if (limit) {
        params.limit = limit;
    }

    if (className !== '') {
        params.tenLop = className;
    }

    if (faculty && faculty !== 'all') {
        params.donVi = faculty;
    }

    params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy; 

    const headers = {'Content-Type': 'blob'};
    const option = {
        headers,
        method: 'get',
        responseType: 'arraybuffer',
        url: `${url}/classes/xls`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    }

    return axios(option)
}

export const getAClassById = (id) => {
    const option = {
        method: "get",
        url: `${url}/classes/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
}

export const createClass = (classObject) => {
    const sendData = {};
    sendData.tenLop = classObject.name;
    sendData.donVi = classObject.faculty._id;
    sendData.nganhHoc = classObject.major;
    sendData.quanLy = classObject.managers;

    const option = {
        method: "post",
        url: `${url}/classes`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: sendData
    }
  
    return axios(option);
}

export const updateClass = (classObject) => {
    const option = {
        method: "put",
        url: `${url}/classes/${classObject._id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: classObject
    }
  
    return axios(option);
}

export const deleteClass = (classId) => {
    const option = {
        method: "delete",
        url: `${url}/classes/${classId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
}