// Node Modules ============================================================ //
import axios from "axios";

import { url } from 'store/constant';

export const uploadFile = (file, type) => {
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    const option = {
        method: "post",
        url: `${url}/files`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        params: { type: type },
        data: formData
    }
    return axios(option);
}