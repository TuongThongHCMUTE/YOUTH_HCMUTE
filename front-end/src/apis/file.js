// Node Modules ============================================================ //
import axios from "axios";

const url = "https://sinhvien5tot-be.herokuapp.com/api/v1";
const token = sessionStorage.getItem("token");

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const option = {
        method: "post",
        url: `${url}/forms/proofs`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    }
    return axios(option);
}