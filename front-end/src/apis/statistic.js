// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';

const token = sessionStorage.getItem("token");

export const countUsersByRole = () => {
    const option = {
        method: "get",
        url: `${url}/statistic/tai-khoan-theo-role`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
};

export const countStudentsByFaculty = () => {
    const option = {
        method: "get",
        url: `${url}/statistic/sinh-vien-theo-don-vi`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
};