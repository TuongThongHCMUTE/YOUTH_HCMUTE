// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

export const getAllStudents= (args) => {
    const token = sessionStorage.getItem("token");
    const { limit, offset, sortBy, isDescending, studentId, studentClass, faculty } = args;

    const params = {
        offset: offset ? offset : 0,
        sortBy: sortBy ? sortBy : 'maSoSV',
    }

    if (limit) {
        params.limit = limit;
    }

    if (studentId) {
        params.maSoSV = studentId;
    }

    if (studentClass && studentClass !== 'all') {
        params.lopSV = studentClass;
    }

    if (faculty && faculty !== 'all') {
        params.donVi = faculty;
    }

    params.sortBy = isDescending ? params.sortBy + ":desc" : params.sortBy; 

    const option = {
        method: 'get',
        url: `${url}/students`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params
    }

    return axios(option)
}

export const getOneStudentById = (id) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: 'get',
        url: `${url}/students/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios(option);
}

export const getListStudentsByStudentId = (id) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: 'get',
        url: `${url}/students`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: { maSoSV: id }
    }

    return axios(option);
}

export const getOneStudentByStudentId = (studentId) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: 'get',
        url: `${url}/students/thong-tin-barcode/${studentId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: { maNamHoc: '2022-2023' }
    }

    return axios(option);
}

export const createOneStudent= (student) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: "post",
        url: `${url}/students`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: student
    }
  
    return axios(option);
}

export const updateOneStudent = ({ googleId, ...student }) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: "put",
        url: `${url}/students/${student._id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: student
    }
  
    return axios(option);
}

export const deleteStudent = (studentId) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: "delete",
        url: `${url}/students/${studentId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
}

export const exportExcelAllStudents = () => {
    const token = sessionStorage.getItem("token");
    const headers = {'Content-Type': 'blob'};
    const option = {
        headers,
        method: 'get',
        responseType: 'arraybuffer',
        url: `${url}/students/xls`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios(option)
}