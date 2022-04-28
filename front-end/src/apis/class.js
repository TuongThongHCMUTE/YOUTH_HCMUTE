// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

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
        params: params
    }

    return axios(option)
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
        data: sendData
    }
  
    return axios(option);
}