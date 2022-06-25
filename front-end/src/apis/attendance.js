// Node Modules ============================================================ //
import axios from "axios";
// Constants =============================================================== //
import { url } from 'store/constant';
const token = sessionStorage.getItem("token");

export const register = (eventId, studentId) => {
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
    const option = {
        method: "get",
        url: `${url}/events/${eventId}/attendances`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axios(option);ß
};

export const checkIn = (eventId, studentId) => {
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
    const option = {
        method: "put",
        url: `${url}/events/${eventId}/attendances/${studentId}/diem-danh-ra`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
  
    return axios(option);
};
