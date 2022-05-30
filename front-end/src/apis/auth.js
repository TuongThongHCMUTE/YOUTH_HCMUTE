// Node Modules ============================================================ //
import axios from "axios";
// Constants =============================================================== //
import { url } from 'store/constant';

const token = sessionStorage.getItem("token");

export const login = (data) => {
    const option = {
        method: "post",
        url: `${url}/auth/dang-nhap`,
        data: data
    }
  
    return axios(option);
}

export const googleLogin = (data) => {
    const option = {
        method: "post",
        url: `${url}/auth/dang-nhap-google`,
        data: data
    }
  
    return axios(option);
}

export const getCurrentUser = () => {
    const option = {
        method: "get",
        url: `${url}/auth/ca-nhan`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    return axios(option);
}