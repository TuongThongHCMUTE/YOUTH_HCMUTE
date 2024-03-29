// Node Modules ============================================================ //
import axios from "axios";
// Constants =============================================================== //
import { url } from 'store/constant';

export const register = (eventId, studentId) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: "put",
        url: `${url}/events/${eventId}/attendances/${studentId}/dang-ky`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
  
    return axios(option);
};

export const cancelRegister = (eventId, studentId) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: "put",
        url: `${url}/events/${eventId}/attendances/${studentId}/huy-dang-ky`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
  
    return axios(option);
};

export const getListAttendances = (eventId) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: "get",
        url: `${url}/events/${eventId}/attendances`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axios(option);
};

export const exportExcelAttendances = (eventId) => {
    const token = sessionStorage.getItem("token");
    const option = {
        headers: {'Content-Type': 'blob'},
        responseType: 'arraybuffer',
        method: "get",
        url: `${url}/events/${eventId}/attendances/xls`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axios(option);
};

export const checkIn = (eventId, studentId) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: "put",
        url: `${url}/events/${eventId}/attendances/${studentId}/diem-danh-vao`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
  
    return axios(option);
};

export const checkOut = (eventId, studentId) => {
    const token = sessionStorage.getItem("token");
    const option = {
        method: "put",
        url: `${url}/events/${eventId}/attendances/${studentId}/diem-danh-ra`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
  
    return axios(option);
};
