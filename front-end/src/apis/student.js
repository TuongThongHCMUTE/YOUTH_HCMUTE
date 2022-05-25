// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

const token = sessionStorage.getItem("token");

export const getOneStudentById = (id) => {
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
    const option = {
        method: 'get',
        url: `${url}/students/thong-tin-barcode/${studentId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: { maNamHoc: '2021-2022'}
    }

    return axios(option);
}

export const updateOneStudent = ({ googleId, ...student }) => {
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