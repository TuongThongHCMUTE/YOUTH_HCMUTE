// Node Modules ============================================================ //
import axios from "axios";

import { url } from 'store/constant';
const token = sessionStorage.getItem("token");

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const option = {
        method: "post",
        url: `${url}/files?type=events`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    }
    return axios(option);
}