// Node Modules ============================================================ //
import axios from "axios";

// Constants =============================================================== //
import { url } from 'store/constant';


export const countUsersByRole = () => {
    const token = sessionStorage.getItem("token");
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
    const token = sessionStorage.getItem("token");
    const option = {
        method: "get",
        url: `${url}/statistic/sinh-vien-theo-don-vi`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
};

export const statisticBills = () => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: "get",
        url: `${url}/statistic/hoa-don`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
}

export const getDataForStudentDashboard = () => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: "get",
        url: `${url}/statistic/dashboard-sinh-vien`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    return axios(option);
}